import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
    constructor(props) {
        super(props);
    }    

    render() {

        const headings = this.props.headings.map((heading) => {
            return (
                <th>{heading}</th>  
            );
        });

        const rows = this.props.data.map((change) => {
            return (
                <tr>
                    <td>{change.when}</td>
                    <td>{change.who}</td>
                    <td>{change.desciption}</td>
                </tr>
            )
        });
        return (
            <div>
                <h1>{this.props.title}</h1>
                <table>
                    <thead>
                        <tr>
                            {headings}
                        </tr>
                    </thead>
                    {rows}
                </table>
            </div>    
        );
    }
}

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
const title = 'Recent Changes';

ReactDOM.render(<App headings={headings} data={data} title={title}/>, document.body);
