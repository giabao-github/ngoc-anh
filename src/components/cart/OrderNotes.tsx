import { Textarea } from "@/components/ui/textarea";

interface OrderNotesProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const OrderNotes: React.FC<OrderNotesProps> = ({ notes, setNotes }) => (
  <div className="p-4 mt-6 bg-orange-50">
    <h3 className="mb-3 font-bold md:text-lg">Ghi chú đơn hàng</h3>
    <Textarea
      className="p-3 mb-2 w-full text-sm font-medium rounded-md border placeholder:text-sm md:text-base md:placeholder:text-base border-neutral-300"
      rows={5}
      placeholder="Ghi chú..."
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
    />
  </div>
);

export default OrderNotes;
