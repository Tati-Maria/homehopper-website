import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";

interface ListingClientProps {
  reservation?: Reservation[];
  listing: SafeListing & {
    host: SafeUser;
  };

  currentUser?: SafeUser | null;
}

const ListingClient = ({
  listing,
  currentUser,
}: ListingClientProps) => {
  return (
    <div>ListingClient</div>
  )
}

export default ListingClient