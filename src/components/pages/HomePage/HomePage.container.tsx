/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect /* , Dispatch */ } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { IRootState } from '../../../reducer/reducer.config';
import ComponentBox, { IComponentBoxOptions } from '../../common/ComponentBox/ComponentBox.presentation';

import { UiComponent as UiComponentModel } from '../../../models/uiComponent/uiComponent.model';


/************************************/
/*            INTERFACES            */
/************************************/
/* Own Props */
interface IOwnProps {}


/* Mapped State to Props */
interface IStateProps {
    data: {
        loading: Boolean, 
        error: {message: string}, 
        uiComponents: Array<UiComponentModel>
    };
}


/*****************************************/
/*            MAPSTATETOPROPS            */
/*****************************************/
// TODO: Estudiar mas el uso de Apollo con Redux, ya que estoy empujando una mala
// implementación, de algo que no se si vaya a usar como es el mapStateProps
function mapStateToProps (state: IRootState): IOwnProps {
    return {
        fetched: state.apollo
    };
}


/**
 * @desc Represents Home Page
 * @class HomePageContainer
 * @extends {React.Component}
 * @returns component page view (Stateful component)
 */
class HomePageContainer extends React.Component<IOwnProps & IStateProps, {}> {

    private componentBoxOptions: IComponentBoxOptions;

    constructor() {
        super();
        this.componentBoxOptions = {
            isClicked: true
        };
    }

    /*   COMPONENTDIDMOUNT    */
    /**************************/
    componentDidMount() {        
        // Init Highlight js
        // hljs.initHighlightingOnLoad();
        let header = document.getElementById('header');
        let footer = document.getElementById('footer');

        header.style.display = 'block';
        footer.style.display = 'block';
    }


    /*         RENDER         */
    /**************************/
    render() {
        
        
        /*       PROPERTIES       */
        /**************************/
        const {
            data: {
                loading, 
                error, 
                uiComponents,
            }
        } = this.props;


        /*       VALIDATIONS       */
        /***************************/
        if (loading) {
            return (
                <div className="fontSize-xxl fontFamily-poppins fontSmoothing-reset flex-center mt-5">
                    Loading...
                </div>
            );
        }

        if (error) {
            return (<p>{error.message}</p>);
        }

        if (uiComponents === null) {
            return (<p>Not Found</p>);
        }


        /*         MARKUP          */
        /***************************/
        return (
            <div className="HomePage sp-bg-darkSnow h-100">

                {/* Logo and Burguer Icon */}
                <div className="jumbotron text-center jumbotron--texture sp-bg-slate m-0">
                    <div className="container position-relative">
                        <h1 className="color-white m-0 mb-3">
                            Build your UI components
                        </h1>
                        <p className="color-extraDarkSmoke fontSize-xl mr-sm-3 ml-sm-3">
                            Get beautiful open source UI components weekly, Join Stylepill weekly list! We'll send a new beautiful set of 3 components weekly to your email.
                        </p>
                    </div>
                </div>

                {/* Components List */}
                <div className="ComponentListSection row sp-bg-darkSnow pt-5 pb-5 margin-0" style={{marginBottom: '150px'}}>
                    <div className="col">
                        <div className="container position-relative">
                            <div className="color-slate fontSize-xl borderBottom-1 borderColor-extraDarkSmoke pb-2 mb-5">
                                Recent
                            </div>
                        </div>

                        <div className="d-flex flex-wrap width-wrapper">
                            {uiComponents.map((uiComponent: UiComponentModel) => (
                                <div key={uiComponent.id} className="componentBox-container boxShadow-float borderRadius-md">
                                    <ComponentBox data={uiComponent} options={this.componentBoxOptions}/>
                                </div>
                            ))}
                        </div>
                    </div>                
                </div>
            </div>
        );
    }
}


const getAllUiComponentsQuery = gql`
    query {
        uiComponents {
          id
          name
          css
          html
          background
        }
    }
`;


/* Export */
export default compose(
    graphql(getAllUiComponentsQuery), 
    connect(mapStateToProps)
)(HomePageContainer);