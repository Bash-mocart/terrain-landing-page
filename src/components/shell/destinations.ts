// The buyer's destinations, in the order the mobile app uses: Explore, Home,
// Chat, Saved, Profile.
//
// Only destinations marked `ready` are rendered. The others are listed so the
// order is fixed in one place and a route flips on by changing one flag, but
// navigation never offers a link to a route that does not exist yet.

export type Destination = {
  label: string;
  href: string;
  ready: boolean;
};

const ALL: Destination[] = [
  { label: "Explore", href: "/explore", ready: false },
  { label: "Home", href: "/browse", ready: true },
  { label: "Chat", href: "/inbox", ready: false },
  { label: "Saved", href: "/saved", ready: false },
  { label: "Profile", href: "/account", ready: false },
];

export const DESTINATIONS = ALL.filter((destination) => destination.ready);

// Marketing beats live on the landing page, reached from the product shell's
// menu rather than from the destinations. Mirrors LINKS in TopNav.
export const MARKETING_LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Products", href: "/#the-terrain-way" },
  { label: "Properties", href: "/#listings" },
];
