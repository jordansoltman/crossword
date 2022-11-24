import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Main from "../components/Main";
import FileDictionaryProvider from "../providers/FileDictionaryProvider";
import { RootState } from "../redux/store";
import DictionaryService from "../services/DictionaryService";
import { Screen } from "../types";
import HomeScreen from "./HomeScreen";

const connector = connect((state: RootState) => ({ screen: state.userInterface.screen }));
type ApplicationProps = ConnectedProps<typeof connector>;

class Application extends React.Component<ApplicationProps> {
    private dictionaryService: DictionaryService;

    constructor(props: ApplicationProps) {
        super(props);

        this.dictionaryService = new DictionaryService(new FileDictionaryProvider());
        this.dictionaryService.load();
    }

    render(): JSX.Element {
        switch (this.props.screen) {
            case Screen.MAIN:
                return <Main dictionaryService={this.dictionaryService} />;
            case Screen.WELCOME:
                return <HomeScreen />;
            default:
                return <div>ERROR</div>;
        }
    }
}

export default connector(Application);
