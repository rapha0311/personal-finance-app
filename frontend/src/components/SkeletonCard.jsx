import ThemeCard from "./ThemeCard";
import Skeleton from "./Skeleton";

function SkeletonCard() {

    return (

        <ThemeCard className="p-6">

            <div className="flex justify-between items-center mb-4">

                <Skeleton className="h-5 w-24" />

                <Skeleton className="h-8 w-8 rounded-full" />

            </div>

            <Skeleton className="h-10 w-40 mb-6" />

            <Skeleton className="h-4 w-28" />

        </ThemeCard>

    );

}

export default SkeletonCard;