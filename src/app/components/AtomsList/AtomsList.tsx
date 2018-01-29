/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { Atom as AtomModel } from '../../../models/atom/atom.model';

import AtomBoxContainer from './../../containers/AtomBox/AtomBox.container';
import InfoSection from './../InfoSection/InfoSection';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomsListProps = {
    atoms: Array<AtomModel>;
    showInfo?: boolean;
};


/**
 * @desc Represent Atoms List
 * @function AtomsList
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 * TODO: Reestructurar componente ya que este es un componente bobo, y esta llamando a
 * un componente inteligente (AtomBox), y eso no es posible.
 */

class AtomsList extends React.Component<AtomsListProps, {}> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: AtomsListProps) {
        super(props);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Build Info Section
     * @method _buildInforSection
     * @example this._buildInforSection()
     * @private
     * @param {AtomModel} atom - Atom entity
     * @returns {void}
     */
    private _buildInfoSection(atom: AtomModel) {

        // Destructuring props
        const {
            showInfo
        } = this.props;

        // const stats = {likes: atom.likes, views: atom.views, stores: atom.stores};
        
        if (showInfo) {
            return (
                <InfoSection title={atom.name} 
                             author={atom.author} />
            );
        }

        return false;
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const {atoms} = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="AtomsList row m-0 no-gutters">
                <div className="col">
                    <div className="d-sm-flex flex-wrap width-wrapper"> 

                        {/* Atom Box */}
                        {atoms.map((atom: AtomModel) => (
                            <div key={atom.id} className="atomBox-container">
                                <AtomBoxContainer atom={atom} />
                                {this._buildInfoSection(atom)}
                            </div>
                        ))}

                    </div>
                </div>                
            </div>
        );

    }
    
}


/* Export */
export default AtomsList;