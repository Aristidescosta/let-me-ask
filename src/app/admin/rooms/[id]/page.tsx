import { RoomView } from "@/components/room-view";

interface AdminRoomPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminRoomPage({ params }: AdminRoomPageProps) {
  const { id } = await params;
  return <RoomView roomId={id} isAdmin={true} />;
}
