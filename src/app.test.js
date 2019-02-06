import React from 'react';
import ProfilePic from './profilepic';
import {shallow} from 'enzyme';
import BioEditor from "./bioeditor";


test('default.jpg is in src if no url is passed', () => {
    const wrapper = shallow(<ProfilePic />);
    expect(
        wrapper.find('img').prop('src')
    ).toBe('https://s3.amazonaws.com/spicedling/TlorU-1JCemXV7-MmulwJzw_SqorVHcD.png');
});

test('passed url is in img src', () => {
    const wrapper = shallow(<ProfilePic url="/funkychicken.jpg"/>);

    expect(
        wrapper.find('img').prop('src')
    ).toBe('/funkychicken.jpg');
});

// test('first and last props appear in alt', () => {
//     const wrapper = shallow(<ProfilePic first="Funky" last="Chicken" />);
//
//     expect(
//         wrapper.find('img').prop('alt')
//     ).toBe('Funky Chicken');
// });

test('confirm that onClick gets called', () => {
    const onClick = jest.fn();

    const wrapper = shallow(<ProfilePic onClick={onClick} />);

    wrapper.find('img').simulate('click');
    wrapper.find('img').simulate('click');

    expect(
        onClick.mock.calls.length
    ).toBe(2);
});
test('When no bio is passed to it, an "Add" button is rendered', () => {
    const wrapper = shallow(<BioEditor />);
    expect(
        wrapper.find('button')
    ).toBe("Add your bio now");

})
