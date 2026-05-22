import IncomeOverview from "../../Components/Dashboard/Overview/IncomeOverview";
import OverviewCard from "../../Components/Dashboard/Overview/OverviewCards";
import RecentUser from "../../Components/Dashboard/Overview/RecentUser";
import UserOverview from "../../Components/Dashboard/Overview/UserOverview";
import { useGetDashboardStatsQuery } from "../../redux/features/dashboard/dashboardApi";

const AdminDashboard = () => {
  const { data, isFetching } = useGetDashboardStatsQuery({}, {
    refetchOnMountOrArgChange: true,
  });
  const statsData = data?.data;
  const recentUser = statsData?.recentUser;
  return (
    <div>
      <>
        <div className="my-5">
          <OverviewCard statsData={statsData} isFetching={isFetching} />
        </div>

        <div className="flex flex-col lg:flex-row gap-5 mt-8 overview">
          <UserOverview />
          <IncomeOverview />
        </div>
        <div>
          <RecentUser recentUser={recentUser} isFetching={isFetching} />
        </div>
      </>
    </div>
  );
};

export default AdminDashboard;
