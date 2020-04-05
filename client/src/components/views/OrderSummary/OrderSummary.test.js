import React from 'react';
import { shallow } from 'enzyme';
import { OrderSummaryComponent } from './OrderSummary';

const mockProps = {
  cart: {
    products: [{
      name: 'cosmetic name',
      images: ['anc.jpeg'],
      manufacturer: 'manuf',
      price: 40,
    }],
    total: 40,
  },
};

describe('Component OrderSummary', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderSummaryComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
