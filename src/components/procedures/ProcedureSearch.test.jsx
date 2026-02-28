import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import ProcedureSearch from './ProcedureSearch';

vi.mock('../../context/LanguageContext', () => ({
  useLanguage: () => ({ t: () => '' }),
}));

describe('ProcedureSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('syncs displayed value when initialValue changes externally', () => {
    const onSearch = vi.fn();
    const { rerender } = render(<ProcedureSearch onSearch={onSearch} initialValue="CABG" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('CABG');

    rerender(<ProcedureSearch onSearch={onSearch} initialValue="" />);
    expect(input).toHaveValue('');
  });

  it('calls onSearch with debounced typed values', () => {
    const onSearch = vi.fn();
    render(<ProcedureSearch onSearch={onSearch} initialValue="" />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'knee' } });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onSearch).toHaveBeenLastCalledWith('knee');
  });
});
