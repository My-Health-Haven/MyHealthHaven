import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import PaperSearch from './PaperSearch';

vi.mock('../../context/LanguageContext', () => ({
  useLanguage: () => ({ t: () => '' }),
}));

/* The same behaviour checks as components/procedures/ProcedureSearch.test.jsx,
   plus the clear button the paper version names. */
describe('PaperSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('syncs displayed value when initialValue changes externally', () => {
    const onSearch = vi.fn();
    const { rerender } = render(<PaperSearch onSearch={onSearch} initialValue='CABG' />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('CABG');

    rerender(<PaperSearch onSearch={onSearch} initialValue='' />);
    expect(input).toHaveValue('');
  });

  it('calls onSearch with debounced typed values', () => {
    const onSearch = vi.fn();
    render(<PaperSearch onSearch={onSearch} initialValue='' />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'knee' } });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onSearch).toHaveBeenLastCalledWith('knee');
  });

  it('clears the field and the search at once', () => {
    const onSearch = vi.fn();
    render(<PaperSearch onSearch={onSearch} initialValue='knee' />);

    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(onSearch).toHaveBeenLastCalledWith('');
  });
});
