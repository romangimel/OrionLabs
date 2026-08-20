import type { ReactNode } from 'react';

interface ResponsiveDataTableProps {
  headers: readonly ReactNode[];
  rows: readonly (readonly ReactNode[])[];
  caption?: string;
}

/** Semantic table with an internal horizontal scroll boundary on narrow screens. */
export function ResponsiveDataTable({
  headers,
  rows,
  caption,
}: ResponsiveDataTableProps) {
  return (
    <div className="max-w-full overflow-x-auto rounded-2xl border border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(262_48%_6%_/_0.58)]">
      <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead className="bg-[hsl(280_45%_13%_/_0.62)]">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="border-b border-[hsl(43_60%_70%_/_0.14)] px-4 py-3 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-[hsl(43_60%_74%)] sm:px-5"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-[hsl(43_60%_70%_/_0.08)] last:border-0">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3.5 align-top leading-relaxed text-foreground/78 sm:px-5"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
