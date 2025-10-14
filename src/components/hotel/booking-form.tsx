// src/components/hotel/booking-form.tsx
"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User, Users } from "lucide-react";

interface BookingFormProps {
  className?: string;
}

export function BookingForm({ className = "" }: BookingFormProps) {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');

  useEffect(() => {
    // Load Flatpickr library for date selection
    const loadFlatpickr = async () => {
      if (typeof window !== 'undefined' && !document.querySelector('link[href*="flatpickr"]')) {
        // Add Flatpickr CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css';
        document.head.appendChild(link);

        // Add Flatpickr JS
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/flatpickr';
        script.onload = () => {
          initializeDatePickers();
        };
        document.head.appendChild(script);
      } else if ((window as any).flatpickr) {
        initializeDatePickers();
      }
    };

    const initializeDatePickers = () => {
      const { flatpickr } = window as any;
      if (!flatpickr) return;

      // Initialize check-in date picker
      flatpickr("#checkInDate", {
        dateFormat: "Y-m-d",
        minDate: "today",
        locale: {
          firstDayOfWeek: 1
        },
        onChange: function(selectedDates: Date[], dateStr: string) {
          setCheckInDate(dateStr);
          // Update checkout min date
          const checkoutPicker = (document.querySelector("#checkOutDate") as any)?._flatpickr;
          if (checkoutPicker && selectedDates[0]) {
            const nextDay = new Date(selectedDates[0]);
            nextDay.setDate(nextDay.getDate() + 1);
            checkoutPicker.set('minDate', nextDay);
          }
        }
      });

      // Initialize check-out date picker  
      flatpickr("#checkOutDate", {
        dateFormat: "Y-m-d",
        minDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        locale: {
          firstDayOfWeek: 1
        },
        onChange: function(selectedDates: Date[], dateStr: string) {
          setCheckOutDate(dateStr);
        }
      });
    };

    loadFlatpickr();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate) {
      alert('Por favor selecciona las fechas de check-in y check-out');
      return;
    }
    
    // Submit the form programmatically
    const form = e.target as HTMLFormElement;
    form.submit();
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <form 
        action="https://direct-book.com/properties/greenviewhotelmedellindirect" 
        method="GET" 
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 shadow-2xl"
      >
        {/* Hidden inputs */}
        <input type="hidden" name="locale" value="es" />
        <input type="hidden" name="currency" value="COP" />
        <input type="hidden" name="trackPage" value="yes" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          {/* Check-in Date */}
          <div className="space-y-2">
            <Label htmlFor="checkInDate" className="text-white font-medium text-sm">
              Check-in
            </Label>
            <div className="relative">
              <input
                type="text"
                id="checkInDate"
                name="checkInDate"
                required
                placeholder="Seleccionar fecha"
                className="w-full px-4 py-3 rounded-lg border-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-300 focus:outline-none font-medium"
                readOnly
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Check-out Date */}
          <div className="space-y-2">
            <Label htmlFor="checkOutDate" className="text-white font-medium text-sm">
              Check-out
            </Label>
            <div className="relative">
              <input
                type="text"
                id="checkOutDate"
                name="checkOutDate"
                required
                placeholder="Seleccionar fecha"
                className="w-full px-4 py-3 rounded-lg border-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-300 focus:outline-none font-medium"
                readOnly
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Adults */}
          <div className="space-y-2">
            <Label htmlFor="adults" className="text-white font-medium text-sm">
              Adultos
            </Label>
            <div className="relative">
              <select
                id="adults"
                name="items[0][adults]"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-0 bg-white text-gray-900 focus:ring-2 focus:ring-green-300 focus:outline-none font-medium appearance-none cursor-pointer"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Children */}
          <div className="space-y-2">
            <Label htmlFor="children" className="text-white font-medium text-sm">
              Niños
            </Label>
            <div className="relative">
              <select
                id="children"
                name="items[0][children]"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-0 bg-white text-gray-900 focus:ring-2 focus:ring-green-300 focus:outline-none font-medium appearance-none cursor-pointer"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
            size="lg"
            className="bg-white text-green-700 hover:bg-gray-50 font-bold px-12 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Consultar Disponibilidad
          </Button>
        </div>
      </form>
    </div>
  );
}