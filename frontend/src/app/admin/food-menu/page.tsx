import AdminContent from "@/components/admincontent";
import AdminNav from "@/components/adminnav";

const AdminFoodMenu = () => {
  return (
    <div className="flex flex-row">
      <AdminNav />
      <AdminContent />
    </div>
  );
};

export default AdminFoodMenu;
