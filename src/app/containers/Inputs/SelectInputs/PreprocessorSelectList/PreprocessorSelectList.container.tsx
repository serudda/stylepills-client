/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../../reducer/reducer.config';

import { Preprocessor as PreprocessorModel } from './../../../../../models/preprocessor/preprocessor.model';

import { getPreprocessorsListWithDefault } from './../../../../../selectors/preprocessor.selector';

import { changePreprocessorAction } from './../../../../../actions/preprocessor.action';

import SelectList from './../../../../components/Inputs/GenericSelectInput/GenericSelectInput';


// -----------------------------------


//        OWN PROPS & STATES      
// ===================================

/* Own Props */
type PreprocessorSelectListProps = {
    selectedOption?: string | number, 
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
};

/* Own States */
type LocalStates = {
    value: string | number
};


//    REDUX MAPPED PROPS & STATES
// ===================================

/* Mapped State to Props */
type StateProps = {
    preprocessorsList: Array<PreprocessorModel>
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            changePreprocessor: (preprocessorId: number | string) => void;
        }
    };
};


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps = 
    PreprocessorSelectListProps
&   StateProps    
&   DispatchProps;



/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class PreprocessorSelectListContainer 
extends React.Component<ChildProps<AllProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AllProps, {}>) {
        super(props);

        // Init state
        this.state = {
            value: props.selectedOption || ''
        };

        // Bind methods
        this.handleChange = this.handleChange.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/

    /**
     * @desc Handle Change
     * @method handleChange
     * @example this.handleChange()
     * @public
     * @returns {void}
     */
    handleChange(e: React.ChangeEvent<HTMLSelectElement>) {

        e.preventDefault();
        
        // VARIABLES
        let value = e.target.value;

        // Update the state
        this.setState((previousState) => {
            return { ...previousState, value };
        }, () => {
            
            // If receive an parent's onChange method
            if (this.props.onChange) {
                this.props.onChange(e);
            } else {
                // If not receive a parent's onChange method, default action.
                this.props.actions.ui.changePreprocessor(value);
            }

        });

    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        const {...data} = this.props.data;
        const { preprocessorsList } = this.props;
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <SelectList value={this.state.value}
                        name="preprocessor"
                        isBlock={true}
                        options={preprocessorsList ? preprocessorsList : null}
                        loading={data.loading}
                        error={data.error}
                        onChange={this.handleChange}/>
        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    return {
        preprocessorsList: getPreprocessorsListWithDefault(state)
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changePreprocessor: (preprocessorId: number | string) => dispatch(changePreprocessorAction(preprocessorId))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const preprocessorSelectListContainerConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    preprocessorSelectListContainerConnect
)(PreprocessorSelectListContainer);