import { Head, Link, usePage } from "@inertiajs/react";
import { dashboard, login } from "@/routes";
import { register } from "@/routes";

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 flex items-center justify-center flex-col rounded-lg bg-white p-6 pb-12 text-[13px]  shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h1 className="text-xl mb-1 font-medium">
                                Let's get started
                            </h1>

                            <ul className="flex gap-10 my-4 text-sm leading-normal">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={register()}
                                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </ul>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
