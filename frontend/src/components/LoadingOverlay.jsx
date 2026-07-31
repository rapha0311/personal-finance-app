import { useLoading } from "../context/LoadingContext";

function LoadingOverlay() {

    const { loading } = useLoading();

    if (!loading) return null;

    return (

        <div
            className="
                fixed
                inset-0
                bg-black/30
                backdrop-blur-sm
                flex
                items-center
                justify-center
                z-50
            "
        >

            <div
                className="
                    bg-white
                    dark:bg-slate-800
                    rounded-2xl
                    p-8
                    shadow-2xl
                    flex
                    flex-col
                    items-center
                    gap-4
                "
            >

                <div
                    className="
                        h-12
                        w-12
                        rounded-full
                        border-4
                        border-blue-600
                        border-t-transparent
                        animate-spin
                    "
                />

                <p
                    className="
                        font-semibold
                        dark:text-white
                    "
                >
                    Carregando...
                </p>

            </div>

        </div>

    );

}

export default LoadingOverlay;