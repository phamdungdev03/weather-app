import { Cloud, MapPin, Menu, Navigation, Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { useWeatherStore } from "@/lib/store";
import React, { memo, useCallback, useEffect, useRef } from "react";
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
    <div className="absolute left-0 right-0 top-full mt-2 z-50">
      <ul
        className="w-full bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden backdrop-blur-sm"
        role="listbox"
        aria-label="City suggestions"
        tabIndex={-1}
      >
        <div className="max-h-[280px] overflow-y-auto custom-scrollbar">
          {suggestions.map((city, index) => (
            <li
              key={`${city.name}-${city.lat}-${city.lon}`}
              className={`cursor-pointer select-none transition-all duration-150 border-b border-gray-100 last:border-b-0 ${
                index === selectedIndex
                  ? 'bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onSelect(city)}
              onMouseEnter={() => onMouseEnter(index)}
              role="option"
              aria-selected={index === selectedIndex}
              tabIndex={-1}
              id={`city-option-${index}`}
            >
              <div className="flex items-center gap-3 px-4 py-3">
                {/* Icon */}
                <div className={`flex-shrink-0 ${
                  index === selectedIndex 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
                }`}>
                  <MapPin className="h-5 w-5" />
                </div>
                
                {/* City Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className={`font-medium truncate ${
                      index === selectedIndex
                        ? 'text-blue-700'
                        : 'text-gray-900'
                    }`}>
                      {city.name}
                    </span>
                    <span className="text-sm text-gray-500 flex-shrink-0">
                      {city.country}
                    </span>
                  </div>
                  
                  {/* Coordinates - subtle detail */}
                  <div className="flex items-center gap-1 mt-0.5">
                    <Navigation className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      {city.lat.toFixed(2)}°, {city.lon.toFixed(2)}°
                    </span>
                  </div>
                </div>

                {/* Selected indicator */}
                {index === selectedIndex && (
                  <div className="flex-shrink-0">
                    <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </div>

        {/* Footer with results count */}
        {suggestions.length > 0 && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              {suggestions.length} {suggestions.length === 1 ? 'result' : 'results'} found
            </p>
          </div>
        )}
      </ul>

    </div>
  ),
);
SearchSuggestions.displayName = 'SearchSuggestions';

const Navbar = memo(() => {
    const { isManualSelection, triggerCurrentLocation } = useWeatherStore();
    const [menuOpen, setMenuOpen] = React.useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
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

    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setSelectedIndex(-1);
        }
      },
      [setSelectedIndex],
    );

    // Click outside effect
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [handleClickOutside]);

    useEffect(() => {
        if (!isManualSelection) {
            clearSearch();
        }
    }, [isManualSelection, clearSearch]);

    const isOpen = citySuggestions.length > 0;
    
    return (
      <nav
      className="bg-gradient-to-r from-white/80 to-blue-50/80 sticky top-0 z-50 shadow-lg backdrop-blur-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-md opacity-50"></div>
              <div className="relative bg-opacity-20 backdrop-blur-sm p-3 rounded-full border border-opacity-30">
                <Cloud className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight text-blue-600">
                Weather
              </h1>
              <p className="text-xs text-blue-500">Your forecast companion</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Search Section (hidden on small screens) */}
          <div className="hidden sm:flex flex-1 justify-center px-4 lg:ml-6 lg:justify-end max-w-2xl">
            <div className="w-full lg:max-w-md" ref={dropdownRef}>
              <div className="relative">
                <div className="relative flex items-center gap-3">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <label htmlFor="city-search" className="sr-only">
                      Search for a city
                    </label>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <Input
                      ref={inputRef}
                      id="city-search"
                      name="search"
                      className="block w-full pl-12 pr-4 py-3.5 bg-opacity-20 backdrop-blur-md border border-opacity-30 rounded-xl placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-opacity-30 transition-all duration-200 text-sm font-medium shadow-lg"
                      placeholder="Search for a city..."
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      aria-expanded={isOpen}
                      aria-autocomplete="list"
                      aria-controls="city-suggestions"
                      aria-activedescendant={
                        selectedIndex >= 0
                          ? `city-option-${selectedIndex}`
                          : undefined
                      }
                      aria-busy={isSearching}
                      aria-label="Search for a city"
                    />
                  </div>

                  {/* Location Button */}
                  <button
                    onClick={handleUseCurrentLocation}
                    className="text-blue-600"
                    aria-label={`${
                      !isManualSelection
                        ? "Using current location"
                        : "Use current location"
                    }`}
                    aria-pressed={!isManualSelection}
                  >
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                {/* Dropdowns and messages */}
                {isOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 z-[9999]">
                    <SearchSuggestions
                      suggestions={citySuggestions}
                      selectedIndex={selectedIndex}
                      onSelect={handleCitySelect}
                      onMouseEnter={setSelectedIndex}
                    />
                  </div>
                )}
                {error && (
                  <div
                    className="absolute left-0 right-0 top-full mt-2 text-red-100 bg-red-500 bg-opacity-90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-red-400"
                    role="alert"
                    aria-live="polite"
                  >
                    {error}
                  </div>
                )}
                {isSearching && (
                  <div
                    className="absolute left-0 right-0 top-full mt-2 bg-opacity-20 backdrop-blur-md p-3 rounded-lg shadow-lg border border-opacity-30"
                    aria-live="polite"
                  >
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent"></div>
                      <span>Searching...</span>
                    </div>
                  </div>
                )}
                {searchQuery.length > 0 && searchQuery.length < 3 && (
                  <div
                    className="absolute left-0 right-0 top-full mt-2 bg-opacity-20 backdrop-blur-md p-3 rounded-lg shadow-lg text-sm border border-opacity-30"
                    aria-live="polite"
                  >
                    Enter at least 3 letters to search
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Section */}
        {menuOpen && (
        <div className="sm:hidden mt-3 pb-4 border-t border-blue-100 relative" ref={dropdownRef}>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                id="city-search-mobile"
                name="search"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 bg-white/40 backdrop-blur-md text-sm focus:ring-2 focus:ring-blue-400"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            <button onClick={handleUseCurrentLocation} className="text-blue-600">
              <MapPin className="h-5 w-5" />
            </button>
          </div>

          {/* Add dropdown here */}
          {isOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 z-[9999]">
              <SearchSuggestions
                suggestions={citySuggestions}
                selectedIndex={selectedIndex}
                onSelect={handleCitySelect}
                onMouseEnter={setSelectedIndex}
              />
            </div>
          )}
        </div>
      )}
      </div>
    </nav>
  );
})

export default Navbar;