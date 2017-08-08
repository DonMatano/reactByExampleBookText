import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// Instead of using jQuery.timeago install the timeago.js to format the time.
import timeago from 'timeago.js';

console.log('start');
        
const headings = ['Updated at', 'Author', 'Change'];

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            changeSets: []
        };
    }   

    render() {

        return (
            <RecentChangeTable>
                <Headings headings={this.props.headings} />
                <Rows changeSets={this.state.changeSets}/>
            </RecentChangeTable> 
        );
    }

    componentDidMount() {
        $.ajax({
            type: "GET",
            url: "https://openlibrary.org/recentchanges.json?limit=10",
            data: {},
            context: this,
            dataType: "json",
            success: (response) => {
                const changeSets = this.mapOpenLibraryDataToChangeSet(response);
                this.setState({ changeSets: changeSets });
            }
        });
    }

    mapOpenLibraryDataToChangeSet(data) {
        return (
            data.map((change, index) => {
                return {
                    "when": timeago().format(change.timestamp),
                    "who": change.author.key,
                    "description": change.comment      
                }
            }
            )    
        );
    }    
}



App.prototypes = {
    headings: PropTypes.array,
    changeSets: PropTypes.array,
    author: PropTypes.string.isRequired
};

// Default props of the app if heading isn't passed
App.defaultProps = {
    headings: ['When happened', 'Who did it', 'What they change']
};

class RecentChangeTable extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Recent Changes </h1>
                <table className='table'>
                    {this.props.children}
                </table>
            </div>
        );
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
        const rows = this.props.changeSets.map((changeSet, index) => {
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
        const headings = this.props.headings.map((name, index) => {
            return (<Heading key={"heading-" + index} heading={name}/>);
        });

        return (<thead><tr className='table-th'>{headings}</tr></thead>)
    }
}

ReactDOM.render(<App headings = {headings} />, document.getElementById('container'));
