

## Update Shahmco Logo

Replace the current circular logo image (`shahmco-logo.jpg`) with the new official Shahmco Global FZC LLC logo (the gold eagle on purple background) throughout the entire website.

### Changes

1. **Copy the new logo** into `src/assets/shahmco-logo.png` (replacing the old `.jpg` reference)

2. **Update Navbar** (`src/components/Navbar.tsx`)
   - Update the import to reference the new `.png` logo
   - Adjust styling to better showcase the new eagle logo (remove the circular crop so the full logo is visible)

3. **Update Footer** (`src/components/Footer.tsx`)
   - Same import and styling adjustments

4. **Update favicon** (`public/favicon.png` + `index.html`)
   - Use the new logo as the site favicon

### Technical Details

- The new logo file will be copied from `user-uploads://` to `src/assets/shahmco-logo.png`
- All components importing the old `shahmco-logo.jpg` will be updated to import the new `.png`
- The logo styling will be adjusted: remove `rounded-full` and `ring` classes to display the full eagle design properly, with appropriate sizing

