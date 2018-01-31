/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';

import { Lib as LibModel, LibTypeOptions } from '../../../models/lib/lib.model';
import LibsList from './../LibsList/LibsList';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AddLibFormProps = {
    title: string,
    description: string,
    type: LibTypeOptions,
    libs: Array<LibModel>,
    onAddClick: (newLib: LibModel) => void;
    onDeleteClick: (lib: LibModel) => void;
};

/* Own States */
type LocalStates = {
    name: string,
    url: string
};

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AddLibForm 
extends React.Component<ChildProps<AddLibFormProps & StateProps & DispatchProps, {}>, LocalStates> {

    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AddLibFormProps & StateProps & DispatchProps, {}>) {

        super(props);

        // Init local state
        this.state = {
            name: '',
            url: ''
        };

        // Bind methods
        this._handleAddClick = this._handleAddClick.bind(this);
        this._handleDeleteClick = this._handleDeleteClick.bind(this);
        this._handleInputChange =  this._handleInputChange.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleInputChange
     * @method _handleInputChange
     * @example this._handleInputChange()
     * @private
     * @param {React.ChangeEvent<HTMLInputElement>} e - Event
     * @returns {void}
     */
    private _handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState((previousState: LocalStates) => ({
            ...previousState,
            [name]: value
        }));
    }


    /**
     * @desc HandleAddClick
     * @method _handleAddClick
     * @example this._handleAddClick()
     * @private 
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    private _handleAddClick(e: React.FormEvent<{}>) {
        e.preventDefault();

        const { type } = this.props;
        const { name, url } = this.state; 

        // Create new lib instance
        let lib: LibModel = {
            name,
            url,
            type
        };
        
        if (this.props.onAddClick) {
            this.props.onAddClick(lib);
        }
    }


    /**
     * @desc HandleDeleteClick
     * @method _handleDeleteClick
     * @example this._handleDeleteClick()
     * @private
     * @param {LibModel} lib - external library to remove of the libs list
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleDeleteClick = (lib: LibModel) => (e: React.FormEvent<{}>) => {
        e.preventDefault();
        
        if (this.props.onDeleteClick) {
            this.props.onDeleteClick(lib);
        }

    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & states
        const { title, description, libs } = this.props;
        const { url } = this.state;

        
        /*         MARKUP          */
        /***************************/
        return (

            <div className="AddLibForm d-flex flex-column w-100">

                <div className="d-flex align-items-center">

                    <div className="d-flex flex-column">
                        
                        <div className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                            {title}
                        </div>
                        
                        <div className="fontSize-sm fontWeight-3 color-extraDarkSmoke fontSmoothing-reset">
                            {description}
                        </div>
                        
                    </div>

                </div>


                <div className="d-flex align-items-center mt-3">                    

                    {/* Input: External Lib Url */}
                    <input type="text" 
                            placeholder="e.g. https://boostrap.com" 
                            className="sp-input sp-input--md sp-input--block"
                            value={url}
                            name="url"
                            onChange={this._handleInputChange}/>

                    {/* Add Button */}
                    <button className="sp-btn sp-btn--secondary sp-btn--md ml-3"
                            onClick={this._handleAddClick}>
                        Add
                    </button>

                </div>

                {/* Build external libs list */}
                <LibsList libs={libs} onDelete={this._handleDeleteClick}/>

            </div>
        );

    }

}


/*         EXPORT          */
/***************************/
export default AddLibForm;