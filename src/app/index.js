import React from 'react';
import ReactDOM from 'react-dom';

const data = [
            {
                "when": "2 minutes ago",
                "who": "Jill Dupre",
                "desciption": "Created new account"
            },
            {
                "when": "1 hour ago",
                "who": "Lose White",
                "desciption": "Added first chapter"
            },
            {
                "when": "2 hours ago",
                "who": "Jordan Whash",
                "desciption": "Created new account"
            }
];
        
const headings = ['When', 'Who', 'Description'];

const props = {
    headings: headings,
    changeSets: data
};


class App extends React.Component{
    constructor(props) {
        super(props);
    }    

    render() {

        return (
            <RecentChangeTable>
                <Headings headings={this.props.headings} />
                <Rows changeSet={this.props.changeSets}/>
            </RecentChangeTable> 
        );
    }
}

class RecentChangeTable extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return <table className = 'table'>
                {this.props.children}
              </table>;
    }
}

class Heading extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const headingStyle = {
            backgroundColor: 'FloralWhite',
            fontSize: '19px'
        };

        return (
            <th style={headingStyle}>{this.props.heading}</th>
        );
    }
}

class Row extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {

        const trStyle = { backgroundColor: 'aliceblue' };

        return (
            <tr style={trStyle}>
                <td>{this.props.changeSet.when}</td>
                <td>{this.props.changeSet.who}</td>
                <td>{this.props.changeSet.desciption}</td>
            </tr>
        );
    }
}

class Rows extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const rows = this.props.changeSet.map((changeSet, index) => {
            return (<Row key={index} changeSet={changeSet}/>);
        });
        return (
            <tbody>
                {rows}
            </tbody> 
        );
    }
}

class Headings extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const headings = this.props.headings.map((heading, index) => {
            return (<Heading key={index} heading={heading}/>);
        });

        return (<thead><tr>{headings}</tr></thead>)
    }
}

ReactDOM.render(<App {...props} headings = {['Updated at ', 'Author', 'Change']} />, document.getElementById('container'));
