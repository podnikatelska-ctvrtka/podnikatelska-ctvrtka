# ProfitCalculator.tsx Motion Fix

## Problém:
ProfitCalculator.tsx používá `motion.div` elementy ALE NEimportuje Motion!

## Řešení:
Najdi všechny `<motion.div` a `</motion.div>` a nahraď je obyčejnými `div`.

## Řádky kde se nachází motion.div:
- Řádek 273-293: Warning if empty Canvas
- Řádek 297-350: FINANČNÍ ANALÝZA
- Řádek 350-457: LEFT: Products & Value Props  
- Řádek 461-690: RIGHT: Segments Analysis
- Řádek 643-686: Summary after all segments
- Řádek 696-895: STRATEGIC RECOMMENDATIONS

## Postup opravy:
1. Otevři ProfitCalculator.tsx
2. Najdi `<motion.div` (Ctrl+F)
3. Nahraď za `<div` (odstraň initial, animate, transition props)
4. Najdi `</motion.div>`
5. Nahraď za `</div>`
6. Opakuj dokud nejsou všechny motion.div nahrazeny

## Alternativa - použij sed:
```bash
sed -i 's/<motion\.div/<div/g' components/ProfitCalculator.tsx
sed -i 's/<\/motion\.div>/<\/div>/g' components/ProfitCalculator.tsx
# Pak ručně odstraň initial, animate, transition props
```

## Po opravě zkontroluj:
```bash
grep -n "motion" components/ProfitCalculator.tsx
# Nemělo by najít žádný výskyt
```
