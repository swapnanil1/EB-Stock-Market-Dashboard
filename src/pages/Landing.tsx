import { useNavigate } from "react-router-dom";

const Landing = () => {
	const navigate = useNavigate();

	return (
		<section
			className="
        flex-1
        flex flex-col justify-center items-center text-center
        bg-cover bg-center bg-no-repeat
        bg-[url(/landing.jpg)]
        px-6
		selection:bg-slate-900
		selection:text-white/70
      "
		>
			<div className="relative text-slate-900 z-10 max-w-2xl ">
				<h1 className="text-5xl font-extrabold tracking-tight drop-shadow-md">
					StockPils
				</h1>
				<p className="mt-4 text-lg text-white leading-relaxed">
					An interactive{" "}
					<span className="font-semibold text-slate-900">
						Stock Market Dashboard
					</span>{" "}
					that helps you monitor real-time market trends, manage your portfolio,
					and analyze trading performance — all in one place.
				</p>

				<div className="mt-8 flex gap-4 justify-center">
					<button
						type="button"
						onClick={() => navigate("/login")}
						className="px-6 py-3 bg-white text-neutral-900 font-semibold rounded-lg shadow-md hover:bg-neutral-100 transition"
					>
						Get Started
					</button>
					<button
						onClick={() =>
							window.open(
								"https://github.com/swapnanil1/EB-Stock-Market-Dashboard",
								"_blank",
							)
						}
						type="button"
						className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition"
					>
						Learn More
					</button>
				</div>
			</div>
		</section>
	);
};

export default Landing;
