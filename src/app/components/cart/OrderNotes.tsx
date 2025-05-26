import { Montserrat } from "next/font/google";
import { Textarea } from "@/app/ui/textarea";


const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400","500", "600", "700", "800"]
});

interface OrderNotesProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const OrderNotes: React.FC<OrderNotesProps> = ({ notes, setNotes }) => (
  <div className="mt-6 p-4 bg-orange-50">
    <h3 className="font-semibold mb-3 md:text-lg">Ghi chú đơn hàng</h3>
    <Textarea
      className={`w-full text-sm placeholder:text-sm md:text-base md:placeholder:text-base p-3 mb-2 border border-neutral-300 rounded-md font-medium ${montserrat.className}`}
      rows={5}
      placeholder="Ghi chú..."
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
    />
  </div>
);

export default OrderNotes;