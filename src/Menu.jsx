import React, { Component } from 'react';
import './App.css';
import program from './Grouping/program';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
var data = program;

const AccordionMenu = ({ groupsArray }) => (
    <div className="menuContainer">
        <Accordion accordion={false}>
            {groupsArray.map((group, i) => {
                return (
                    <AccordionItem key={i}>
                        <AccordionItemTitle>
                            <h3 className="u-position-relative" >{group[0].memberName}
                                <span className="rightAlign">{group[0].memberDistance}</span>
                                <div className="accordion__arrow" role="presentation" /> </h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th className="rightTd">Cumulative Distance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {group.map((member, j) => ((j > 0 ? <tr key={j}><td>{group[j].memberName}</td>
                                        <td className="rightTd">{member.memberDistance}</td></tr> : null)))}
                                </tbody>
                            </table>

                        </AccordionItemBody>
                    </AccordionItem>)
            })}

        </Accordion>
    </div>
);

class Menu extends Component {
    render() {
        return (
            <div>
                <AccordionMenu groupsArray={data} />
            </div>
        )
    }
}

export default Menu;