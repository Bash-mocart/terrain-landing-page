import { LaunchGate } from "@/components/LaunchGate";

// Until launch the home page is the LaunchGate. At launch it goes back to
// (see git history before the gate):
//   Hero (live map)   Own. Build. Grow. + waitlist
//   Journey           five chapters               #how-it-works
//   Protection        built to protect you from fraud  #protection #companies
//   Closing           sell on Terrain + be first in + waitlist  #for-companies #waitlist
export default function Home() {
  return <LaunchGate />;
}
