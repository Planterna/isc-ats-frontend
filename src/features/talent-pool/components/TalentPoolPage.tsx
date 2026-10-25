'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

import { Badge } from '@/design-system/ui/badge';
import { Button } from '@/design-system/ui/button';
import { DataTable, type ColumnDef } from '@/design-system/organisms/DataTable';
import { FilterBar } from '@/design-system/molecules/FilterBar';
import { Combobox } from '@/design-system/molecules/Combobox';
import { Avatar } from '@/design-system/atoms/Avatar';
import { cn } from '@/shared/utils';
import { ROUTES } from '@/shared/constants/routes';
import { useTalentPool } from '../hooks/useTalentPool';
import { useTalentPoolNavStore } from '@/shared/stores/talentPoolNavStore';
import type { TalentPoolEntry, TalentPoolFilters } from '../types';

const MATCH_COLORS = (pct: number) => {
  if (pct >= 75) return 'text-success bg-success/10';
  if (pct >= 50) return 'text-warning bg-warning/10';
  return 'text-danger bg-danger/10';
};

export function TalentPoolPage() {
  const router = useRouter();
  const { data: entries = [], isLoading } = useTalentPool();
  const setNavEntries = useTalentPoolNavStore((s) => s.setEntries);

  const [filters, setFilters] = useState<TalentPoolFilters>({
    search: '',
    career: null,
    vacancyId: null,
    status: '',
    skill: null,
    tool: null,
  });

  const careers = useMemo(() => {
    return Array.from(new Set(entries.map((e) => e.career).filter(Boolean))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [entries]);

  const vacancies = useMemo(() => {
    return Array.from(
      new Map(
        entries
          .filter((e) => e.vacancyId)
          .map((e) => [e.vacancyId, e.vacancyTitle]),
      ).entries(),
    ).sort((a, b) => a[1].localeCompare(b[1]));
  }, [entries]);

  const availableSkills = useMemo(() => {
    const set = new Set<string>();
    for (const entry of entries) {
      if (Array.isArray(entry.skills)) {
        for (const skill of entry.skills) {
          if (skill && skill.trim()) set.add(skill.trim());
        }
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [entries]);

  const availableTools = useMemo(() => {
    const set = new Set<string>();
    for (const entry of entries) {
      if (Array.isArray(entry.tools)) {
        for (const tool of entry.tools) {
          if (tool && tool.trim()) set.add(tool.trim());
        }
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [entries]);

  const hasActiveFilters = Boolean(
    filters.search ||
      filters.career ||
      filters.vacancyId ||
      filters.status ||
      filters.skill ||
      filters.tool,
  );

  const resetFilters = () => {
    setFilters({
      search: '',
      career: null,
      vacancyId: null,
      status: '',
      skill: null,
      tool: null,
    });
  };

  const filtered = useMemo(() => {
    return [...entries]
      .sort((a, b) => Number(b.id) - Number(a.id))
      .filter((e) => {
        const q = filters.search.trim().toLowerCase();
        if (q) {
          const matchName = e.candidateName.toLowerCase().includes(q);
          const matchCareer = e.career.toLowerCase().includes(q);
          const matchEmail = e.email?.toLowerCase().includes(q);
          const matchVacancy = e.vacancyTitle?.toLowerCase().includes(q);
          const matchSkill = e.skills?.some((s) => s.toLowerCase().includes(q));
          const matchTool = e.tools?.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchCareer && !matchEmail && !matchVacancy && !matchSkill && !matchTool) {
            return false;
          }
        }

        if (filters.career && e.career !== filters.career) return false;
        if (filters.vacancyId && e.vacancyId !== filters.vacancyId) return false;
        if (filters.status === 'active' && !e.isActive) return false;
        if (filters.status === 'inactive' && e.isActive) return false;

        if (filters.skill) {
          const target = filters.skill.toLowerCase();
          if (!e.skills?.some((s) => s.toLowerCase().includes(target))) {
            return false;
          }
        }

        if (filters.tool) {
          const target = filters.tool.toLowerCase();
          if (!e.tools?.some((t) => t.toLowerCase().includes(target))) {
            return false;
          }
        }

        return true;
      });
  }, [entries, filters]);

  const columns: ColumnDef<TalentPoolEntry>[] = [
    {
      key: 'candidate',
      header: 'Candidato',
      render: (e) => (
        <div className="flex items-center gap-2.5">
          <Avatar
            size="sm"
            initials={e.candidateInitials}
            src={e.candidateAvatarFileId ? `/api/candidate/cv/${e.candidateAvatarFileId}?view=1` : undefined}
            className={cn('text-white', e.avatarColor)}
          />
          <span className="font-medium text-ink">{e.candidateName}</span>
        </div>
      ),
    },
    {
      key: 'vacancyTitle',
      header: 'Vacante de origen',
      render: (e) => <span className="text-ink-muted">{e.vacancyTitle}</span>,
    },
    {
      key: 'career',
      header: 'Carrera',
      render: (e) => <span className="text-ink-muted">{e.career}</span>,
    },
    {
      key: 'technologies',
      header: 'Conocimientos y herramientas',
      render: (e) => {
        const skills = e.skills ?? [];
        const tools = e.tools ?? [];
        const total = skills.length + tools.length;

        if (total === 0) {
          return <span className="text-xs text-ink-subtle">Sin datos de CV</span>;
        }

        return (
          <div className="flex flex-wrap items-center gap-1 max-w-[280px]">
            {skills.slice(0, 2).map((s) => {
              const isMatch = Boolean(
                filters.skill && s.toLowerCase().includes(filters.skill.toLowerCase()),
              );
              return (
                <span
                  key={s}
                  className={cn(
                    'rounded-full px-2 py-0.5 text-[11px] font-medium border transition-colors',
                    isMatch
                      ? 'bg-primary-100 text-primary-800 border-primary-300 font-semibold'
                      : 'bg-primary-50 text-primary-700 border-primary-100',
                  )}
                  title={`Conocimiento: ${s}`}
                >
                  {s}
                </span>
              );
            })}
            {tools.slice(0, 2).map((t) => {
              const isMatch = Boolean(
                filters.tool && t.toLowerCase().includes(filters.tool.toLowerCase()),
              );
              return (
                <span
                  key={t}
                  className={cn(
                    'rounded-full px-2 py-0.5 text-[11px] font-medium border transition-colors',
                    isMatch
                      ? 'bg-accent-100 text-accent-800 border-accent-300 font-semibold'
                      : 'bg-surface-2 text-ink-muted border-border',
                  )}
                  title={`Herramienta: ${t}`}
                >
                  {t}
                </span>
              );
            })}
            {total > 4 && (
              <span className="text-[11px] text-ink-subtle font-medium">+{total - 4}</span>
            )}
          </div>
        );
      },
    },
    {
      key: 'phone',
      header: 'Teléfono',
      render: (e) => <span className="text-ink-muted">{e.phone}</span>,
    },
    {
      key: 'email',
      header: 'Correo',
      render: (e) => <span className="text-ink-muted">{e.email}</span>,
    },
    {
      key: 'match',
      header: 'Match',
      align: 'right',
      render: (e) => (
        <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', MATCH_COLORS(e.matchPercent))}>
          {e.matchPercent}%
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Estado',
      render: (e) => (
        <Badge variant={e.isActive ? 'success' : 'neutral'}>
          {e.isActive ? 'Activo' : 'Inactivo'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-ink">Banco de talento</h1>

      {/* Filters */}
      <FilterBar
        search={{
          value: filters.search,
          onChange: (value) => setFilters((f) => ({ ...f, search: value })),
          placeholder: 'Buscar candidato, carrera, tecnología…',
        }}
      >
        <Combobox
          valueKey="id"
          aria-label="Filtrar por conocimiento"
          className="w-auto min-w-[190px]"
          value={filters.skill ?? ''}
          onChange={(value) => setFilters((f) => ({ ...f, skill: value || null }))}
          options={[
            { id: '', label: 'Conocimiento: Todos' },
            ...availableSkills.map((s) => ({ id: s, label: s })),
          ]}
        />

        <Combobox
          valueKey="id"
          aria-label="Filtrar por herramienta"
          className="w-auto min-w-[190px]"
          value={filters.tool ?? ''}
          onChange={(value) => setFilters((f) => ({ ...f, tool: value || null }))}
          options={[
            { id: '', label: 'Herramienta: Todas' },
            ...availableTools.map((t) => ({ id: t, label: t })),
          ]}
        />

        <Combobox
          valueKey="id"
          aria-label="Filtrar por carrera"
          className="w-auto min-w-[170px]"
          value={filters.career ?? ''}
          onChange={(value) => setFilters((f) => ({ ...f, career: value || null }))}
          options={[
            { id: '', label: 'Carrera: Todas' },
            ...careers.map((c) => ({ id: c, label: c })),
          ]}
        />

        <Combobox
          valueKey="id"
          aria-label="Filtrar por vacante de origen"
          className="w-auto min-w-[190px]"
          value={filters.vacancyId ?? ''}
          onChange={(value) => setFilters((f) => ({ ...f, vacancyId: value || null }))}
          options={[
            { id: '', label: 'Vacante: Todas' },
            ...vacancies.map(([id, title]) => ({ id, label: title })),
          ]}
        />

        <Combobox
          valueKey="id"
          aria-label="Filtrar por estado"
          className="w-auto min-w-[140px]"
          value={filters.status}
          onChange={(value) => setFilters((f) => ({ ...f, status: value }))}
          options={[
            { id: '', label: 'Estado: Todos' },
            { id: 'active', label: 'Activo' },
            { id: 'inactive', label: 'Inactivo' },
          ]}
        />

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs text-ink-muted hover:text-ink gap-1.5 h-9"
          >
            <X className="h-3.5 w-3.5" />
            Limpiar filtros
          </Button>
        )}
      </FilterBar>

      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(e) => e.id}
        isLoading={isLoading}
        onRowClick={(entry) => {
          const idx = filtered.indexOf(entry);
          setNavEntries(filtered.map((e) => ({ candidateId: e.candidateId, tpId: e.id })));
          router.push(
            ROUTES.bancoTalentoCandidate(entry.candidateId, {
              pos: idx + 1,
              total: filtered.length,
              tpId: entry.id,
            }),
          );
        }}
        emptyState={{ title: 'Sin resultados para los filtros seleccionados.' }}
      />

      <div className="text-sm text-ink-muted">
        Mostrando {filtered.length} de{' '}
        <span className="font-medium text-ink">{entries.length}</span> candidato
        {entries.length !== 1 ? 's' : ''} guardado{entries.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
