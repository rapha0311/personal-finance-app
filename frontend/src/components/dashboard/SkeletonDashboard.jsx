import Skeleton from "../Skeleton";
import SkeletonCard from "../SkeletonCard";

function SkeletonDashboard() {

    return (

        <>

            <Skeleton
                className="
                    h-36
                    w-full
                    mb-8
                    rounded-3xl
                "
            />

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-6
                    mb-8
                "
            >

                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />

            </div>

            <Skeleton
                className="
                    h-96
                    w-full
                    rounded-2xl
                "
            />

        </>

    );

}

export default SkeletonDashboard;