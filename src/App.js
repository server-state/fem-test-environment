import React from 'react';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import DrawerContent from './components/drawer-content';
import AppBar from './components/app-bar';
import SimpleDashboard from './components/simple-dashboard';

import FEM from 'femSrcIndex';
import sampleData from 'femSrcSamples';
import FEMPackage from 'femPackageJSON';

const defaultData = [{
    name: 'Default',
    data: 'Hello World!'
}];

function checkSampleData(data) {
    if (!Array.isArray(data)) {
        throw 'SampleData is not an array.';
    }

    for (let i = 0; i < data.length; i++) {
        if (typeof data[i] !== 'object')
            throw `Data sample ${i} is not an object.`;
        if (typeof data[i].name !== 'string')
            throw `Data sample ${i} has an invalid name property.`;
    }
}

function generateInfos(packageJSON) {
    const packageFilter = [ 'id', 'name', 'description', 'version' ];

    // filter useful information out of fem package.json
    const femInfos = Object.keys(packageJSON)
        .filter(key => packageFilter.includes(key))
        .reduce((obj, key) => {
            obj[key] = packageJSON[key];
            return obj;
        }, {});

    // convert non identical information to specification
    femInfos['support_url'] = packageJSON.bugs || null;
    femInfos['website'] = packageJSON.homepage || null;

    femInfos['repo_url'] = packageJSON.repository && packageJSON.repository.url
        ? packageJSON.repository.url.split('+')[1] || null
        : null;
    
    return femInfos
}

export default class App extends React.Component {
    constructor(props) {
        super(props);

        checkSampleData(sampleData);

        const data = sampleData || defaultData;
        this.state = {
            data,
            selected: data[0],
            textFieldValue: '',
            isError: false,
            info: generateInfos(FEMPackage)
        };
        
        console.log(this.state.info);

        this.handleSelected = this.handleSelected.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSelected(selectedName, newData) {
        this.setState({
            selected: this.state.data.find(({ name }) => name === selectedName) ||
                {
                    name: 'Custom',
                    data: newData || this.state.selected.data
                }
        });
    }

    handleChange(value) {
        let newValue = null;
        let isError = false;
        try {
            newValue = JSON.parse(value);
        } catch {
            isError = true;
        }

        this.setState({
            isError,
            textFieldValue: value
        });

        this.handleSelected('Custom', newValue);
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <AppBar
                    drawerContent={
                        <DrawerContent
                            info={this.state.info}
                            data={this.state.data}
                            selected={this.state.selected}
                            onSelected={this.handleSelected}
                            textFieldValue={this.state.textFieldValue}
                            onChange={this.handleChange}
                            isError={this.state.isError}
                        />
                    }
                >
                    <SimpleDashboard
                        info={this.state.info}
                    >
                        <FEM.component data={this.state.selected.data} />
                    </SimpleDashboard>
                </AppBar>
            </ThemeProvider>
        );
    }
}
