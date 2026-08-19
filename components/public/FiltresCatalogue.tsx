"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react";

interface Props {
  categories: string[];
  pays: string[];
  actifCategorie: string;
  actifPays: string;
  min: number | null;
  max: number | null;
  sort: string;
  q: string;
}

export default function FiltresCatalogue({ categories, pays, actifCategorie, actifPays, min, max, sort, q }: Props) {
  const router = useRouter();
  const [maxPrice, setMaxPrice] = useState(max ?? 5000000);
  const [open, setOpen] = useState({ cat: true, price: true, country: true });

  const toggle = (k: keyof typeof open) => setOpen((p) => ({ ...p, [k]: !p[k] }));

  const apply = (params: Record<string, string | undefined>) => {
    const usp = new URLSearchParams();
    if (params.q) usp.set("q", params.q);
    if (params.categorie) usp.set("categorie", params.categorie);
    if (params.pays) usp.set("pays", params.pays);
    if (params.min) usp.set("min", params.min);
    if (params.max) usp.set("max", params.max);
    if (params.sort) usp.set("sort", params.sort);
    router.push(`/catalogue?${usp.toString()}`);
  };

  const reset = () => {
    setMaxPrice(5000000);
    router.push("/catalogue");
  };

  const base = { categorie: actifCategorie, pays: actifPays, min: min?.toString(), max: max?.toString(), sort, q };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-medium text-[#2F241A] mb-1.5">Recherche</label>
        <input
          type="text"
          defaultValue={q}
          onKeyDown={(e) => { if (e.key === "Enter") apply({ ...base, q: (e.target as HTMLInputElement).value }); }}
          placeholder="Rechercher une œuvre..."
          className="w-full bg-white border border-[#E8DFCE] rounded-xl px-3.5 py-2.5 text-xs text-[#2F241A] focus:outline-none focus:border-[#C4953A]"
        />
      </div>

      <div>
        <button onClick={() => toggle("cat")} className="w-full flex items-center justify-between text-xs font-bold text-[#4B2E20] py-2 cursor-pointer">
          <span>Catégories</span>
          {open.cat ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {open.cat && (
          <div className="space-y-1 pt-1">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2.5 text-xs text-[#2F241A]/80 cursor-pointer hover:text-[#A67123]">
                <input type="checkbox" checked={actifCategorie === cat} onChange={() => apply({ ...base, categorie: actifCategorie === cat ? undefined : cat })} className="w-4 h-4 rounded border-[#C4B296] text-[#A67123] accent-[#A67123]" />
                {cat}
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <button onClick={() => toggle("price")} className="w-full flex items-center justify-between text-xs font-bold text-[#4B2E20] py-2 cursor-pointer">
          <span>Prix max</span>
          {open.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {open.price && (
          <div className="pt-2 space-y-3">
            <input type="range" min={0} max={5000000} step={50000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} onMouseUp={() => apply({ ...base, max: maxPrice.toString() })} onTouchEnd={() => apply({ ...base, max: maxPrice.toString() })} className="w-full accent-[#A67123]" />
            <div className="flex justify-between text-[10px] text-[#2F241A]/60">
              <span>0 FCFA</span>
              <span className="font-bold text-[#A67123]">{new Intl.NumberFormat("fr-FR").format(maxPrice)} FCFA</span>
            </div>
          </div>
        )}
      </div>

      <div>
        <button onClick={() => toggle("country")} className="w-full flex items-center justify-between text-xs font-bold text-[#4B2E20] py-2 cursor-pointer">
          <span>Pays</span>
          {open.country ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {open.country && (
          <div className="space-y-1 pt-1 max-h-40 overflow-y-auto">
            {pays.map((p) => (
              <label key={p} className="flex items-center gap-2.5 text-xs text-[#2F241A]/80 cursor-pointer hover:text-[#A67123]">
                <input type="checkbox" checked={actifPays === p} onChange={() => apply({ ...base, pays: actifPays === p ? undefined : p })} className="w-4 h-4 rounded border-[#C4B296] text-[#A67123] accent-[#A67123]" />
                {p}
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-xs font-bold text-[#4B2E20] py-2">Trier par</label>
        <select value={sort} onChange={(e) => apply({ ...base, sort: e.target.value })} className="w-full bg-white border border-[#E8DFCE] rounded-xl px-3.5 py-2.5 text-xs text-[#2F241A] focus:outline-none focus:border-[#C4953A] cursor-pointer">
          <option value="recent">Plus récentes</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix décroissant</option>
        </select>
      </div>

      <button onClick={reset} className="w-full flex items-center justify-center gap-2 text-xs font-medium text-[#8B6236] hover:text-[#A67123] py-2 cursor-pointer border border-[#E8DFCE] rounded-xl hover:bg-[#F6F2E7]">
        <RotateCcw className="w-3.5 h-3.5" />
        Réinitialiser les filtres
      </button>
    </div>
  );
}