import { MonitorSmartphone, Monitor, Smartphone } from "lucide-react";

export const MobileBlocked = () => {
    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-center text-white selection:bg-neutral-800">
            <div className="max-w-md w-full flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-500">

                {/* Animated Icons */}
                <div className="relative flex items-center justify-center mb-4">
                    <div className="absolute opacity-20 -left-12 bottom-0 animate-bounce delay-150">
                        <Smartphone size={48} className="text-red-500" />
                    </div>
                    <div className="relative z-10 bg-neutral-900 p-6 rounded-full border border-neutral-800 shadow-2xl shadow-neutral-900/50">
                        <Monitor size={80} className="text-blue-500" />
                    </div>
                    <div className="absolute opacity-20 -right-12 top-0 animate-pulse">
                        <MonitorSmartphone size={48} className="text-purple-500" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent">
                        Thiết Bị Không Hỗ Trợ
                    </h1>
                    <p className="text-neutral-400 text-lg leading-relaxed">
                        Trải nghiệm tốt nhất của trang web này được thiết kế dành cho nền tảng máy tính.
                        <br />
                        <span className="text-neutral-200 font-medium">Vui lòng mở trang web trên màn hình lớn hơn.</span>
                    </p>
                </div>

                {/* Info Card */}
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 w-full text-left space-y-3 backdrop-blur-sm">

                    <div className="flex items-center space-x-3 text-sm text-neutral-300">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <p>Yêu cầu: Màn hình điện thoại hoặc máy tính bảng xoay ngang, hoặc máy tính</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MobileBlocked;
