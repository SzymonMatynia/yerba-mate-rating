import React from 'react';
import {render, screen} from '@testing-library/react';
import TableComponent from './table.component';
import {Table} from './types/table.types';

const tableDataMock: Table = {
  headers: ['first', 'second'],
  rows: [
    {
      id: 1,
      cells: [
        {
          content: 'John',
        },
        {
          content: 'Derek',
        },
      ],
    },
    {
      id: 2,
      cells: [
        {
          content: <p>Di maria</p>,
        },
        {
          content: 'Rocky',
        },
      ],
    },
  ],
};

describe('TableComponent', () => {
  beforeEach(() => {
    render(<TableComponent table={tableDataMock}/>);
  });

  it('render all given headers as divs inside TH elements', () => {
    for (const header of tableDataMock.headers) {
      const th = screen.getByText(new RegExp(header, 'i'));
      expect(th.nodeName).toBe('DIV');
      expect(th?.parentElement?.nodeName).toBe('TH');
      expect(th.textContent).toBe(header);
    }
  });

  it('render given cells as TD elements', () => {
    for (const {content} of tableDataMock.rows[0].cells) {
      let tdContent;
      if (React.isValidElement(content)) {
        tdContent = content.props.children;
      } else {
        tdContent = content;
      }

      const th = screen.getByText(new RegExp(tdContent.toString(), 'i'));
      expect(th.nodeName).toBe('TD');
    }
  });

  it('allows to render ReactNode as td content', () => {
    const td = screen.getByText('Di maria');
    expect(td.nodeName).toBe('P');
  });
});


