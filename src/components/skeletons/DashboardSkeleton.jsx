import Skeleton from "../common/Skeleton";

const DashboardSkeleton = () => {

    return (

        <div className="space-y-8">

            <Skeleton className="h-12 w-72" />

            <Skeleton className="h-6 w-96" />

            <div className="grid gap-6 md:grid-cols-4">

                {[1,2,3,4].map((item) => (

                    <Skeleton
                        key={item}
                        className="h-36"
                    />

                ))}

            </div>

            <Skeleton className="h-96" />

        </div>

    );

};

export default DashboardSkeleton;