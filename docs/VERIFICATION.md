# Verification

Completed during generation:
- Five automated tests passed: JSON round-trip, malformed/duplicate/out-of-range rejection, empty backup support, CSV escaping/formula mitigation and alert derivation.
- React server rendering smoke check passed for the overview, inventory and charts.
- TypeScript strict checking and Vite production build passed.

Browser-based visual/interaction QA was unavailable in the creation environment. No GitHub deployment was performed; the included workflow executes tests/build again on GitHub.

## Manual acceptance after local start or deployment

1. Open the site at desktop and phone widths. Confirm sidebar/mobile navigation, scrolling inventory and dialog usability.
2. Add a server; confirm `Unmonitored`, edit it, refresh the page and verify persistence. Delete it and check confirmation.
3. Search hostname and filter group/status. Clear filters and confirm all records reappear.
4. Export JSON, delete a server, then import the backup. Confirm before replacement; malformed JSON must leave inventory unchanged.
5. Export CSV after filtering; verify only matching rows export.
6. Refresh sample; verify changes and the explicit simulation notice. No network monitoring should occur.
7. Navigate using keyboard, open details, and close with Escape. Confirm visible focus.
8. Reset demo from Architecture and confirm the original six fictional hosts return.
9. Confirm asset requests work under `/linux-server-command-center/` on GitHub Pages.
10. Open another browser/device: the site should load but inventory is independent until manually imported.
