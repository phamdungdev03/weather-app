import { MapPin, Search } from "lucide-react";
import { Input } from "../ui/input";

const Navbar = () => {
    return (
        <nav className="border-b">
            <div className="container px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div>
                        <h5>Hi, Dung</h5>
                        <h1 className="font-mono font-bold text-2xl">Good Morning</h1>
                    </div>

                    <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                        <div className="max-w-lg w-full lg:max-w-xss">
                            <div className="relative flex items-center gap-2">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search 
                                        className="h-5 w-5 text-muted-foreground"
                                        aria-hidden="true"
                                    />
                                </div>
                                <Input
                                    ref={null}
                                    id="city-search"
                                    name="search"
                                    className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="Search for a city..."
                                    type="search"
                                    aria-autocomplete="list"
                                    aria-controls="city-suggestions"
                                    aria-label="Search for a city"
                                />
                                <button
                                    className={`p-2 rounded-md hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary`}
                                >
                                    <MapPin className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;