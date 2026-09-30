'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useReactToPrint } from 'react-to-print';
import {
  Lock,
  Printer,
  Plus,
  Trash2,
  ArrowLeft,
  FileText,
} from 'lucide-react';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export default function InvoicePage() {
  // 1. PASSWORD SECURITY GATE
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passError, setPassError] = useState(false);

  // 2. INVOICE STATE FORM VARIABLES
  const [invoiceNo, setInvoiceNo] = useState('07/2026');
  const [date, setDate] = useState('31-Jul-2026');
  const [clientName, setClientName] = useState('ABC Studios Pvt Ltd');
  const [clientAddress, setClientAddress] = useState(
    '123 Creative Hub, MG Road,\nBengaluru, Karnataka - 560001'
  );
  const [clientPan, setClientPan] = useState('ABCDE1234F');
  const [clientGstin, setClientGstin] = useState('29ABCDE1234F1Z5');
  const [taxRate, setTaxRate] = useState<number>(18);

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: '1',
      description: 'Sports Videography & Still Photography Coverage',
      quantity: 1,
      rate: 50000,
    },
  ]);

  // Ref for print container
  const contentRef = useRef<HTMLDivElement>(null);

  // Helper: Extract client first name and sanitize invoice number for file name
  const clientFirstName = clientName.trim().split(' ')[0] || 'Client';
  const cleanInvoiceNo = invoiceNo.replace(/[/\\?%*:|"<>]/g, '-');
  const pdfDocumentTitle = `${clientFirstName}_Invoice_${cleanInvoiceNo}`;

  // Helper: Increment numeric invoice number (e.g. 07/2026 -> 08/2026, 7/2026 -> 8/2026)
  const incrementInvoiceNo = (currentNo: string): string => {
    const match = currentNo.match(/^(\d+)(\/.*)?$/);
    if (match) {
      const numStr = match[1];
      const rest = match[2] || '';
      const nextNum = parseInt(numStr, 10) + 1;
      const padded = nextNum.toString().padStart(numStr.length, '0');
      return `${padded}${rest}`;
    }
    return currentNo;
  };

  // react-to-print trigger
  const handlePrintTrigger = useReactToPrint({
    contentRef,
    documentTitle: pdfDocumentTitle,
    onAfterPrint: () => {
      setInvoiceNo((prev) => incrementInvoiceNo(prev));
    },
  });

  const handlePrintClick = () => {
    if (handlePrintTrigger) {
      handlePrintTrigger();
    }
  };

  // Password submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Adrian2024') {
      setIsAuthenticated(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  // Item handlers
  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        description: 'New Services / Production Coverage',
        quantity: 1,
        rate: 10000,
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemChange = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Auto Calculations
  const subtotal = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.rate) || 0),
    0
  );
  const taxAmount = (subtotal * (Number(taxRate) || 0)) / 100;
  const grandTotal = subtotal + taxAmount;

  // PASSWORD GATE OVERLAY
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08080C] px-4 py-12 select-none relative z-[100]">
        <div className="w-full max-w-md bg-surface/50 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-ice-blue/10 border border-ice-blue/30 flex items-center justify-center text-ice-blue mx-auto shadow-[0_0_25px_rgba(0,212,255,0.3)]">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-bold text-white tracking-wide">
              Adrian's Invoice Portal
            </h2>
            <p className="text-xs font-mono text-text-muted">
              Enter authorized password to generate invoices
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface/80 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-text-muted/50 text-center font-mono focus:border-ice-blue focus:ring-1 focus:ring-ice-blue/40 outline-none transition-all"
                autoFocus
              />
              {passError && (
                <p className="text-xs font-mono text-red-400 mt-2">
                  Incorrect Password. Access Denied.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-ice-blue text-black font-mono font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:scale-[1.02] transition-all cursor-pointer"
            >
              Unlock Generator
            </button>
          </form>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Website</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080C] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 select-none">
      
      {/* PRINT MEDIA STYLES */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          header, nav, button, .no-print {
            display: none !important;
          }
          .printable-document {
            box-shadow: none !important;
            padding: 12mm 15mm !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      {/* Top Controls Bar */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 no-print">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-ice-blue uppercase tracking-widest hover:text-white transition-colors bg-surface/80 px-4 py-2 rounded-full border border-white/15"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <div className="flex items-center gap-2 text-sm font-mono text-white/80">
            <FileText className="w-4 h-4 text-ice-blue" />
            <span className="font-bold">Invoice Studio</span>
          </div>
        </div>

        {/* PRINT PDF BUTTON */}
        <button
          type="button"
          onClick={handlePrintClick}
          className="px-6 py-3 rounded-full bg-ice-blue text-black font-mono font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
        >
          <Printer className="w-4 h-4 text-black" />
          <span>Download / Print PDF</span>
        </button>
      </div>

      {/* SPLIT SCREEN GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: INPUT FORM (xl:col-span-5) */}
        <div className="xl:col-span-5 bg-surface/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-6 shadow-2xl no-print">
          <h2 className="font-heading text-xl font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <span>Invoice Details</span>
          </h2>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1 block">
                Invoice No.
              </label>
              <input
                type="text"
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                className="w-full bg-surface/60 border border-white/10 rounded-lg p-3 text-sm text-white font-mono focus:border-ice-blue outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1 block">
                Invoice Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-surface/60 border border-white/10 rounded-lg p-3 text-sm text-white font-mono focus:border-ice-blue outline-none"
              />
            </div>
          </div>

          {/* Client Details */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <h3 className="text-xs font-mono font-bold text-ice-blue uppercase tracking-widest">
              Bill To Client Info
            </h3>

            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1 block">
                Client / Company Name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-surface/60 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-ice-blue outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1 block">
                Client Address
              </label>
              <textarea
                rows={3}
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className="w-full bg-surface/60 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-ice-blue outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1 block">
                  Client PAN
                </label>
                <input
                  type="text"
                  value={clientPan}
                  onChange={(e) => setClientPan(e.target.value)}
                  className="w-full bg-surface/60 border border-white/10 rounded-lg p-3 text-sm text-white font-mono focus:border-ice-blue outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1 block">
                  Client GSTIN
                </label>
                <input
                  type="text"
                  value={clientGstin}
                  onChange={(e) => setClientGstin(e.target.value)}
                  className="w-full bg-surface/60 border border-white/10 rounded-lg p-3 text-sm text-white font-mono focus:border-ice-blue outline-none"
                />
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-4 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold text-ice-blue uppercase tracking-widest">
                Line Items
              </h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-1 text-xs font-mono text-ice-blue hover:text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Row</span>
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-surface/70 border border-white/10 space-y-2 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted uppercase">
                      Item #{index + 1}
                    </span>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="Description of service..."
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(item.id, 'description', e.target.value)
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-ice-blue outline-none"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-text-muted block mb-0.5">
                        Qty
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            'quantity',
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white font-mono focus:border-ice-blue outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-text-muted block mb-0.5">
                        Rate (₹)
                      </label>
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            'rate',
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white font-mono focus:border-ice-blue outline-none"
                      />
                    </div>
                  </div>

                  <div className="text-right text-xs font-mono text-ice-blue font-semibold pt-1">
                    Amount: ₹
                    {((Number(item.quantity) || 0) * (Number(item.rate) || 0)).toLocaleString(
                      'en-IN',
                      { minimumFractionDigits: 2 }
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tax Rate & Totals Summary */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-text-muted">
                Tax Rate (IGST %)
              </label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                className="w-20 bg-surface/60 border border-white/10 rounded-lg p-2 text-xs text-white font-mono text-right focus:border-ice-blue outline-none"
              />
            </div>

            <div className="p-4 rounded-xl bg-surface/60 border border-white/10 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-text-muted">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>IGST ({taxRate}%):</span>
                <span>₹{taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/10">
                <span className="text-ice-blue">Grand Total:</span>
                <span className="text-ice-blue">
                  ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Print Action */}
          <button
            type="button"
            onClick={handlePrintClick}
            className="w-full py-4 rounded-xl bg-ice-blue text-black font-mono font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4 text-black" />
            <span>Download / Print PDF</span>
          </button>
        </div>

        {/* RIGHT COLUMN: PRECISE UNIFORM A4 INVOICE PREVIEW */}
        <div className="xl:col-span-7 flex flex-col items-center overflow-x-auto w-full">
          <div className="w-full overflow-x-auto pb-6">
            
            {/* A4 PRINTABLE CONTAINER WITH UNIFORM SPACING */}
            <div
              ref={contentRef}
              className="printable-document bg-white text-black p-10 sm:p-12 shadow-2xl w-full max-w-[210mm] min-h-[297mm] mx-auto text-sm sm:text-base font-sans flex flex-col justify-between select-text"
              style={{ colorScheme: 'light' }}
            >
              <div className="space-y-4">
                
                {/* 1. TOP LOGO (LEFT ALIGNED) */}
                <div className="w-full">
                  <div className="relative w-52 h-14 sm:w-60 sm:h-16">
                    <Image
                      src="/Frames by Adrian Black.png"
                      alt="Frames by Adrian"
                      fill
                      className="object-contain object-left"
                      priority
                    />
                  </div>
                </div>

                {/* 2. REFINED TAX INVOICE TITLE (CENTERED DIRECTLY BELOW LOGO) */}
                <div className="text-center w-full py-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-[0.2em] text-black uppercase font-sans text-center">
                    TAX INVOICE
                  </h1>
                </div>

                {/* 3. SENDER DETAILS (LEFT) & DATE / INV NO (RIGHT) */}
                <div className="grid grid-cols-12 gap-4 items-start pb-2">
                  {/* Left: Sender Details */}
                  <div className="col-span-7 space-y-1 text-xs sm:text-sm text-gray-900 leading-snug">
                    <p className="font-bold text-base text-black">Adrian Dsilva</p>
                    <p className="text-gray-800 leading-normal max-w-sm font-medium">
                      #008, SLV RK SIGNATURE,<br />
                      Next to Classic Royal Garden, Hennur Main Road,<br />
                      Bengaluru, Karnataka - 560043
                    </p>
                    <p className="font-mono text-xs pt-1">
                      <strong className="text-black font-bold">GSTN:</strong> 29CASPD5646K1Z1
                    </p>
                    <p className="font-mono text-xs">
                      <strong className="text-black font-bold">HSN Code:</strong> 9983
                    </p>
                    <p className="font-mono text-xs">
                      <strong className="text-black font-bold">PAN:</strong> CASPD5646K
                    </p>
                    <div className="pt-1.5 space-y-0.5">
                      <p className="font-mono text-xs">
                        <strong className="text-black font-bold">Mobile:</strong> +91 8880656537
                      </p>
                      <p className="font-mono text-xs">
                        <strong className="text-black font-bold">Email:</strong> framesbyaj@gmail.com
                      </p>
                    </div>
                  </div>

                  {/* Right: Date & Invoice No */}
                  <div className="col-span-5 text-right space-y-2 pt-1">
                    <p className="font-mono text-xs sm:text-sm text-gray-900">
                      <strong className="text-black font-bold">Date:</strong> {date}
                    </p>
                    <p className="font-mono text-xs sm:text-sm text-gray-900">
                      <strong className="text-black font-bold">INV NO:</strong> {invoiceNo}
                    </p>
                  </div>
                </div>

                {/* 4. BILL TO SECTION (MATCHES ADRIAN NAME FONT & UNIFORM LINE SPACING) */}
                <div className="text-xs sm:text-sm space-y-1.5 pt-2 leading-snug">
                  <span className="font-bold text-xs uppercase tracking-widest text-black block">
                    BILL TO:
                  </span>
                  <p className="font-bold text-base text-black">{clientName}</p>
                  <p className="text-gray-800 whitespace-pre-line leading-relaxed max-w-md font-medium">{clientAddress}</p>
                  <div className="pt-1.5 space-y-0.5 font-mono text-xs">
                    {clientPan && (
                      <p>
                        <strong className="text-black font-bold">Pan No:</strong> {clientPan}
                      </p>
                    )}
                    {clientGstin && (
                      <p>
                        <strong className="text-black font-bold">GSTIN:</strong> {clientGstin}
                      </p>
                    )}
                  </div>
                </div>

                {/* 5. UNIFORM SINGLE TABLE */}
                <table className="w-full border-collapse border border-gray-400 text-xs sm:text-sm my-4">
                  <thead>
                    <tr className="bg-gray-200 text-black font-bold uppercase tracking-wider text-xs border-b border-gray-400">
                      <th className="py-2 px-3 text-left w-10 border-r border-gray-400 font-bold">#</th>
                      <th className="py-2 px-3 text-left border-r border-gray-400 font-bold">DESCRIPTION</th>
                      <th className="py-2 px-3 text-center w-24 border-r border-gray-400 font-bold">QUANTITY</th>
                      <th className="py-2 px-3 text-right w-32 border-r border-gray-400 font-bold">RATE</th>
                      <th className="py-2 px-3 text-right w-40 font-bold">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-400">
                    {items.map((item, idx) => {
                      const qty = Number(item.quantity) || 0;
                      const rate = Number(item.rate) || 0;
                      const rowTotal = qty * rate;

                      return (
                        <tr key={item.id} className="text-gray-900 border-b border-gray-400">
                          <td className="py-2 px-3 align-top text-gray-700 font-mono border-r border-gray-400">
                            {idx + 1}
                          </td>
                          <td className="py-2 px-3 align-top font-medium whitespace-pre-line leading-relaxed border-r border-gray-400">
                            {item.description}
                          </td>
                          <td className="py-2 px-3 align-top text-center font-mono border-r border-gray-400">
                            {qty}
                          </td>
                          <td className="py-2 px-3 align-top text-right font-mono border-r border-gray-400">
                            ₹{rate.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-2 px-3 align-top text-right font-mono font-semibold">
                            ₹{rowTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      );
                    })}

                    {/* UNIFORM COMPACT TABLE FOOTER ROWS */}
                    <tr className="border-t-2 border-gray-400 bg-gray-50">
                      <td colSpan={4} className="py-2 px-4 text-right font-mono font-semibold text-gray-900 border-r border-gray-400 text-xs sm:text-sm">
                        Subtotal:
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-semibold text-black text-xs sm:text-sm">
                        ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>

                    <tr className="bg-gray-50 border-t border-gray-400">
                      <td colSpan={4} className="py-2 px-4 text-right font-mono font-semibold text-gray-900 border-r border-gray-400 text-xs sm:text-sm">
                        IGST {taxRate}%:
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-semibold text-black text-xs sm:text-sm">
                        ₹{taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>

                    <tr className="bg-gray-200 border-t-2 border-black font-bold text-black">
                      <td colSpan={4} className="py-2.5 px-4 text-right font-mono font-bold text-sm tracking-wider uppercase border-r border-gray-400">
                        TOTAL:
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-base text-black">
                        ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>

              </div>

              {/* 6. FOOTER & BANK DETAILS SECTION */}
              <div className="pt-4 border-t border-gray-300 space-y-4 text-xs sm:text-sm mt-4">
                
                <div className="flex items-end justify-between gap-6">
                  {/* Left Side: Bank Details with Bold Headers */}
                  <div className="space-y-1 max-w-md">
                    <p className="italic text-gray-700 font-mono text-xs mb-1 font-medium">
                      The Details of Bank account is as follows:
                    </p>
                    <p className="font-bold text-base text-black">Kotak Mahindra Bank</p>
                    <p className="text-gray-900 font-mono text-xs">
                      <strong className="text-black font-bold">Account Number:</strong> 4650943267 | <strong className="text-black font-bold">Account Type:</strong> Current
                    </p>
                    <p className="text-gray-900 font-mono text-xs">
                      <strong className="text-black font-bold">Account Holder:</strong> ADRIAN D SILVA
                    </p>
                    <p className="text-gray-900 font-mono text-xs">
                      <strong className="text-black font-bold">IFSC:</strong> KKBK0000432 | <strong className="text-black font-bold">Branch:</strong> BANGALORE KAMANHALLI
                    </p>
                  </div>

                  {/* Right Side: Signature & Regards */}
                  <div className="text-right shrink-0 space-y-1">
                    <p className="italic text-gray-800 font-bold text-sm">With Regards,</p>
                    <div className="relative w-36 h-16 ml-auto my-1">
                      <Image
                        src="/signature.jpeg"
                        alt="Signature"
                        fill
                        className="object-contain object-right filter contrast-125"
                      />
                    </div>
                    <p className="font-bold text-black text-base">Adrian Dsilva</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
