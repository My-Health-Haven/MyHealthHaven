import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ProcedureFilters from './ProcedureFilters';

vi.mock('../../context/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key) => key,
  }),
}));

const renderProcedureFilters = (props) => render(<ProcedureFilters {...props} />);

describe('ProcedureFilters', () => {
  it('renders Speciality before Category, Type, and Complexity', () => {
    renderProcedureFilters({
      availableFilters: {
        top_category: ['Medical Necessity'],
        group_bucket: ['High'],
        care_type: ['Treatment'],
        section_group: ['Cardiology'],
        section: ['Major Surgery'],
      },
      selectedFilters: {},
      onFilterChange: () => {},
      onClearFilters: () => {},
      columnConfig: {
        top_category: { label: 'Category' },
        group_bucket: { label: 'Complexity' },
        care_type: { label: 'Type' },
        section_group: { label: 'Speciality' },
        section: { label: 'Procedure Type' },
      },
    });

    const speciality = screen.getByText('Speciality');
    const category = screen.getByText('Category');
    const type = screen.getByText('Type');
    const complexity = screen.getByText('Complexity');

    expect(speciality.compareDocumentPosition(category) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(category.compareDocumentPosition(type) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(type.compareDocumentPosition(complexity) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
