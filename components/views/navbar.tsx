import { MapPin, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useWeatherStore } from "@/lib/store";
import React, { memo, useCallback, useRef } from "react";
import { useOptimizedSearch } from "@/hooks/useOptimizedSearch";

const SearchSuggestions = memo(
  ({
    suggestions,
    selectedIndex,
    onSelect,
    onMouseEnter,
  }: {
    suggestions: Array<{ name: string; country: string; lat: number; lon: number }>;
    selectedIndex: number;
    onSelect: (city: { name: string; country: string; lat: number; lon: number }) => void;
    onMouseEnter: (index: number) => void;
  }) => (
    <div className="absolute left-0 right-0 top-full mt-1">
      <ul
        className="w-full bg-background shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        role="listbox"
        aria-label="City suggestions"
        tabIndex={-1}
      >
        {suggestions.map((city, index) => (
          <li
            key={`${city.name}-${city.lat}-${city.lon}`}
            className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
              index === selectedIndex ? 'bg-primary/10' : ''
            }`}
            onClick={() => onSelect(city)}
            onMouseEnter={() => onMouseEnter(index)}
            role="option"
            aria-selected={index === selectedIndex}
            tabIndex={-1}
            id={`city-option-${index}`}
          >
            <span className="flex items-center">
              <span className="ml-3 block truncate">
                {city.name}, {city.country}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  ),
);

const Navbar = memo(() => {
    const { isManualSelection, triggerCurrentLocation } = useWeatherStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const {
        searchQuery,
        citySuggestions,
        isSearching,
        error,
        selectedIndex,
        setSelectedIndex,
        handleKeyDown,
        handleCitySelect,
        clearSearch,
        setSearchQuery,
    } = useOptimizedSearch();

    const handleUseCurrentLocation = useCallback(() => {
        triggerCurrentLocation();
        clearSearch();
    }, [triggerCurrentLocation, clearSearch]);

    React.useEffect(() => {
        if (!isManualSelection) {
            clearSearch();
        }
    }, [isManualSelection, clearSearch]);
    
    const isOpen = citySuggestions.length > 0;

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
                                    ref={inputRef}
                                    id="city-search"
                                    name="search"
                                    className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="Search for a city..."
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    aria-expanded={isOpen}
                                    aria-autocomplete="list"
                                    aria-controls="city-suggestions"
                                    aria-activedescendant={
                                        selectedIndex >= 0 ? `city-option-${selectedIndex}` : undefined
                                    }
                                    aria-busy={isSearching}
                                    aria-label="Search for a city"
                                />
                                <button
                                    onClick={handleUseCurrentLocation}
                                    className={`p-2 rounded-md hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary ${
                                    !isManualSelection ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                                    aria-label={`${!isManualSelection ? 'Using current location' : 'Use current location'}`}
                                    aria-pressed={!isManualSelection}
                                >
                                    <MapPin className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>

                             {isOpen && (
                                <div className="relative">
                                    <SearchSuggestions
                                    suggestions={citySuggestions}
                                    selectedIndex={selectedIndex}
                                    onSelect={handleCitySelect}
                                    onMouseEnter={setSelectedIndex}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
})

export default Navbar;