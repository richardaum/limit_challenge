import { render, screen, fireEvent } from '@testing-library/react';
import { SubmissionLayoutSwitcher } from './SubmissionLayoutSwitcher';

describe('SubmissionLayoutSwitcher', () => {
  it('renders grid and list buttons', () => {
    render(<SubmissionLayoutSwitcher value="grid" onChange={vi.fn()} />);

    expect(screen.getByLabelText('Grid view')).toBeInTheDocument();
    expect(screen.getByLabelText('List view')).toBeInTheDocument();
  });

  it('calls onChange when list is selected', () => {
    const onChange = vi.fn();
    render(<SubmissionLayoutSwitcher value="grid" onChange={onChange} />);

    fireEvent.click(screen.getByLabelText('List view'));
    expect(onChange).toHaveBeenCalledWith('list');
  });

  it('calls onChange when grid is selected', () => {
    const onChange = vi.fn();
    render(<SubmissionLayoutSwitcher value="list" onChange={onChange} />);

    fireEvent.click(screen.getByLabelText('Grid view'));
    expect(onChange).toHaveBeenCalledWith('grid');
  });

  it('does not call onChange when null is passed', () => {
    const onChange = vi.fn();
    render(<SubmissionLayoutSwitcher value="grid" onChange={onChange} />);

    const toggleGroup = screen.getByLabelText('Submissions layout');
    fireEvent.click(toggleGroup);
    expect(onChange).not.toHaveBeenCalled();
  });
});
