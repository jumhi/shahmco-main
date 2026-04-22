import ProductStore from "@/components/ProductStore";
import PaymentMethodsBanner from "@/components/PaymentMethodsBanner";
import { Section, FadeIn } from "@/components/SectionComponents";

const Product = () => {
  return (
    <>
      <ProductStore />

      {/* Payment Methods Banner */}
      <Section className="pt-0">
        <FadeIn>
          <PaymentMethodsBanner />
        </FadeIn>
      </Section>
    </>
  );
};

export default Product;
