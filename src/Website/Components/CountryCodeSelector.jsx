import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, ChevronDown, Check, X } from 'lucide-react';
import { allCountries, popularCountries, defaultCountry } from './countryData';

export function CountryFlag({ country, size = 18 }) {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [country?.iso]);

  if (!country) return null;

  return (
    <span
      className="uae-country-flag-icon"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size + 4,
        flexShrink: 0
      }}
    >
      {!imgFailed && country.iso ? (
        <img
          key={country.iso}
          src={`https://flagcdn.com/w40/${country.iso.toLowerCase()}.png`}
          alt={country.name}
          width={size + 2}
          height={Math.round(size * 0.75)}
          style={{ objectFit: 'cover', borderRadius: '2px', display: 'inline-block' }}
          onError={() => setImgFailed(true)}
          loading="lazy"
        />
      ) : (
        <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>{country.flag || '🌐'}</span>
      )}
    </span>
  );
}

export default function CountryCodeSelector({
  value = '+971',
  onChange,
  onPhoneFocus,
  disabled = false,
  id = 'uae-country-selector'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const listRef = useRef(null);

  // Maintain selected country state so countries sharing dial codes (e.g. CA and US) preserve choice
  const [selectedCountry, setSelectedCountry] = useState(() => {
    if (!value) return defaultCountry;
    return allCountries.find(c => c.code === value) || defaultCountry;
  });

  // Sync if value changes externally
  useEffect(() => {
    if (value && selectedCountry.code !== value) {
      const match = allCountries.find(c => c.code === value);
      if (match) setSelectedCountry(match);
    }
  }, [value, selectedCountry.code]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 60);
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  // Filter countries with smart alias & dial code matching
  const filteredCountries = useMemo(() => {
    const raw = search.trim().toLowerCase();
    if (!raw) return null;
    const cleanDigits = raw.replace(/^\+/, '');

    return allCountries.filter(c => {
      const name = c.name.toLowerCase();
      const codeDigits = c.code.replace(/^\+/, '');
      const iso = c.iso.toLowerCase();

      if (name.includes(raw) || iso === raw || codeDigits.includes(cleanDigits) || c.code.includes(raw)) {
        return true;
      }
      // Common aliases
      if (c.iso === 'AE' && (raw === 'uae' || raw === 'dubai')) return true;
      if (c.iso === 'GB' && raw === 'uk') return true;
      if (c.iso === 'US' && (raw === 'usa' || raw === 'us')) return true;
      return false;
    });
  }, [search]);

  // Current active list for keyboard navigation
  const currentList = useMemo(() => {
    if (filteredCountries) return filteredCountries;
    return [...popularCountries, ...allCountries];
  }, [filteredCountries]);

  const handleSelect = country => {
    setSelectedCountry(country);
    onChange?.(country.code, country);
    setIsOpen(false);
    setSearch('');
    if (typeof onPhoneFocus === 'function') {
      onPhoneFocus();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearch('');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev < currentList.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentList[highlightedIndex]) {
        handleSelect(currentList[highlightedIndex]);
      }
    }
  };

  return (
    <div className="uae-country-picker" ref={dropdownRef} id={id}>
      <button
        type="button"
        className="uae-country-btn"
        onClick={() => !disabled && setIsOpen(prev => !prev)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Country calling code: ${selectedCountry.name} (${selectedCountry.code}). Click to open country code list.`}
      >
        <CountryFlag country={selectedCountry} size={18} />
        <span className="uae-country-code-val">{selectedCountry.code}</span>
        <ChevronDown size={14} className={`uae-country-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="uae-country-dropdown" role="listbox" onKeyDown={handleKeyDown}>
          <div className="uae-country-search-wrap">
            <Search size={14} className="uae-country-search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="uae-country-search-input"
              placeholder="Search country or code (e.g. UAE, 971)..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setHighlightedIndex(0);
              }}
              aria-label="Search countries or dialing code"
            />
            {search && (
              <button
                type="button"
                className="uae-country-search-clear"
                onClick={() => {
                  setSearch('');
                  searchInputRef.current?.focus();
                }}
                aria-label="Clear search"
              >
                <X size={12} />
              </button>
            )}
          </div>

          <div className="uae-country-list" ref={listRef}>
            {filteredCountries ? (
              filteredCountries.length > 0 ? (
                filteredCountries.map((c, idx) => {
                  const isSelected = selectedCountry.iso === c.iso;
                  const isHighlighted = idx === highlightedIndex;
                  return (
                    <div
                      key={`filtered-${c.iso}-${c.code}`}
                      className={`uae-country-item ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlighted' : ''}`}
                      onClick={() => handleSelect(c)}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <CountryFlag country={c} size={18} />
                      <span className="uae-country-item-name">{c.name}</span>
                      <span className="uae-country-item-code">{c.code}</span>
                      {isSelected && <Check size={14} className="uae-country-check" />}
                    </div>
                  );
                })
              ) : (
                <div className="uae-country-empty">No country found for "{search}"</div>
              )
            ) : (
              <>
                <div className="uae-country-section-title">Popular Countries</div>
                {popularCountries.map((c, idx) => {
                  const isSelected = selectedCountry.iso === c.iso;
                  const isHighlighted = idx === highlightedIndex;
                  return (
                    <div
                      key={`pop-${c.iso}-${c.code}`}
                      className={`uae-country-item ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlighted' : ''}`}
                      onClick={() => handleSelect(c)}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <CountryFlag country={c} size={18} />
                      <span className="uae-country-item-name">{c.name}</span>
                      <span className="uae-country-item-code">{c.code}</span>
                      {isSelected && <Check size={14} className="uae-country-check" />}
                    </div>
                  );
                })}

                <div className="uae-country-section-divider" />
                <div className="uae-country-section-title">All Countries</div>

                {allCountries.map((c, idx) => {
                  const itemIndex = popularCountries.length + idx;
                  const isSelected = selectedCountry.iso === c.iso;
                  const isHighlighted = itemIndex === highlightedIndex;
                  return (
                    <div
                      key={`all-${c.iso}-${c.code}`}
                      className={`uae-country-item ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlighted' : ''}`}
                      onClick={() => handleSelect(c)}
                      onMouseEnter={() => setHighlightedIndex(itemIndex)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <CountryFlag country={c} size={18} />
                      <span className="uae-country-item-name">{c.name}</span>
                      <span className="uae-country-item-code">{c.code}</span>
                      {isSelected && <Check size={14} className="uae-country-check" />}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
