import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, Mail, StickyNote, X, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Lead = {
  id: string;
  full_name: string;
  company: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  submitted_at: string;
  notes: string | null;
};

const STATUS_OPTIONS = ["new", "replied", "archived"] as const;

const statusColors: Record<string, string> = {
  new: "bg-accent/20 text-accent border-accent/30",
  replied: "bg-green-500/20 text-green-400 border-green-500/30",
  archived: "bg-muted text-muted-foreground border-border",
};

const formatUAEDate = (iso: string) => {
  return new Date(iso).toLocaleString("en-GB", {
    timeZone: "Asia/Dubai",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const AdminLeads = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [noteInput, setNoteInput] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) {
      toast({ title: "Error loading leads", description: error.message, variant: "destructive" });
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      if (selectedLead?.id === id) setSelectedLead((prev) => prev ? { ...prev, status } : null);
    }
  };

  const saveNote = async (id: string) => {
    const { error } = await supabase.from("leads").update({ notes: noteInput }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes: noteInput } : l)));
      if (selectedLead?.id === id) setSelectedLead((prev) => prev ? { ...prev, notes: noteInput } : null);
      setEditingNoteId(null);
      toast({ title: "Note saved" });
    }
  };

  const filtered = leads.filter((l) => {
    if (filter !== "all" && l.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        l.full_name.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 pt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Leads Dashboard
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage corporate inquiries from shahmco.com
            </p>
          </div>
          {newCount > 0 && (
            <span className="bg-accent text-accent-foreground text-sm font-semibold px-3 py-1 rounded-full">
              {newCount} new
            </span>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, company, or email..."
              className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-muted-foreground" />
            {["all", ...STATUS_OPTIONS].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-all capitalize ${
                  filter === s
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No leads found.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50 border-b border-border">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Company</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Phone</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 text-foreground font-medium">{lead.full_name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{lead.company}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{lead.email}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{lead.phone || "—"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-md border font-medium ${statusColors[lead.status]} bg-transparent focus:outline-none cursor-pointer`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s} className="bg-background text-foreground">{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs hidden sm:table-cell">
                      {formatUAEDate(lead.submitted_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                          title="View"
                        >
                          <Eye size={15} />
                        </button>
                        <a
                          href={`mailto:${lead.email}?subject=Re: Your Inquiry — SHAHMCO Global FZC`}
                          className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-accent transition-colors"
                          title="Reply"
                        >
                          <Mail size={15} />
                        </a>
                        <button
                          onClick={() => {
                            setEditingNoteId(lead.id);
                            setNoteInput(lead.notes || "");
                          }}
                          className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                          title="Add note"
                        >
                          <StickyNote size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Note editing inline */}
        <AnimatePresence>
          {editingNoteId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
              onClick={() => setEditingNoteId(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg font-semibold">Internal Note</h3>
                  <button onClick={() => setEditingNoteId(null)} className="text-muted-foreground hover:text-foreground">
                    <X size={18} />
                  </button>
                </div>
                <textarea
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  rows={4}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none text-sm mb-4"
                  placeholder="Add internal notes about this lead..."
                />
                <button
                  onClick={() => saveNote(editingNoteId)}
                  className="w-full bg-gradient-gold text-accent-foreground py-2.5 rounded-lg font-semibold text-sm"
                >
                  Save Note
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lead detail modal */}
        <AnimatePresence>
          {selectedLead && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedLead(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg shadow-card max-h-[80vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl font-semibold">{selectedLead.full_name}</h3>
                  <button onClick={() => setSelectedLead(null)} className="text-muted-foreground hover:text-foreground">
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Company</span>
                    <span className="text-foreground font-medium">{selectedLead.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <a href={`mailto:${selectedLead.email}`} className="text-accent hover:underline">{selectedLead.email}</a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="text-foreground">{selectedLead.phone || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className={`text-xs px-2 py-0.5 rounded border font-medium capitalize ${statusColors[selectedLead.status]}`}>
                      {selectedLead.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Submitted</span>
                    <span className="text-foreground">{formatUAEDate(selectedLead.submitted_at)}</span>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <p className="text-muted-foreground mb-2">Message</p>
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed bg-secondary/50 rounded-lg p-4">
                      {selectedLead.message}
                    </p>
                  </div>

                  {selectedLead.notes && (
                    <div className="pt-3 border-t border-border">
                      <p className="text-muted-foreground mb-2">Internal Notes</p>
                      <p className="text-foreground whitespace-pre-wrap text-sm bg-accent/5 rounded-lg p-4 border border-accent/10">
                        {selectedLead.notes}
                      </p>
                    </div>
                  )}
                </div>

                <a
                  href={`mailto:${selectedLead.email}?subject=Re: Your Inquiry — SHAHMCO Global FZC`}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-gold text-accent-foreground py-2.5 rounded-lg font-semibold text-sm"
                >
                  <Mail size={15} /> Reply to {selectedLead.full_name.split(" ")[0]}
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminLeads;
