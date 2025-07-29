import AdminContent from "@/components/admincontent";
import AdminNav from "@/components/adminnav";

const Admin = () => {
  return (
    <div className=" flex flex-row">
      <AdminNav />
      <AdminContent />
    </div>
  );
};

export default Admin;
