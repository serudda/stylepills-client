/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';


/************************************/
/*            INTERFACES            */
/************************************/
interface IComponentDetailSectionProps {}


/**
 * @desc Component Detail Section
 * @function ComponentDetailSection
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @memberof ComponentPage
 * @returns page view
 */
const ComponentDetailSection: React.SFC<IComponentDetailSectionProps> = () => {

    const componentStateStyle: React.CSSProperties = {
        marginLeft: 'auto',
        marginRight: 'auto',
        top: '50%',
        WebkitTransform: 'translateY(-50%)',
        transform: 'translateY(-50%)'
    }

    const componentContainer: React.CSSProperties = {
        height: '300px',
        position: 'relative'
    };

    const componentRightContainer: React.CSSProperties = {
        height: '100%',
        position: 'relative'
    };

    const normalTitle: React.CSSProperties = {
        position: 'absolute',
        top: '15px',
        left: '22px'
    };

    const avatarStyle: React.CSSProperties = {
        verticalAlign: 'middle',
        position: 'relative'
    };

    const designByContainer: React.CSSProperties = {
        position: 'absolute',
        bottom: '15px',
        right: '22px'
    };

    const designByLink: React.CSSProperties = {
        cursor: 'pointer',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
    };

    const designByText: React.CSSProperties = {
        order: -1
    };

    const componentStateRightStyle: React.CSSProperties = {
        height: '33.3%',
        position: 'relative'
    };

    const focusTitle: React.CSSProperties = {
        position: 'absolute',
        top: '10px',
        left: '18px'
    };

    const componentStateContainerStyle: React.CSSProperties = {
        marginLeft: 'auto',
        marginRight: 'auto',
        top: '50%',
        WebkitTransform: 'translateY(-50%)',
        transform: 'translateY(-50%)',
        position: 'relative'
    };

    const componentStateSection: React.CSSProperties = {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '170px'
    };

    const userNameState: React.CSSProperties = {
        color: '#00ab6b'
    };

    const labelsState: React.CSSProperties = {
        color: '#949494',
        fontSize: '12px'
    };

    const separatorPoint: React.CSSProperties = {
        color: '#949494'
    };


    return(
        <section className="bg-black padding-8">
            <div className="container">

                {/* Created Date */}
                <div className="row marginBottom-6">
                    <div className="col-xs-12">
                        <h3 className="color-white borderBottom-2 borderColor-darkSnow paddingBottom-2 float-right">
                            6 September, 2017
                        </h3>
                    </div>
                </div>

                {/* Component States */}
                <div className="row marginBottom-7">
                    <div className="col-xs-12 col-sm-6">

                        {/* Component States Title */}
                        <div className="row marginBottom-3">
                            <div className="col-xs-12">
                                <h2 className="color-white fontWeight-6 margin-0 marginBottom-1">
                                    Avatars
                                    <span className="ma-label ma-label--box ma-label--box--sm ma-label--box--primary marginLeft-2">NEW</span>
                                </h2>
                                <p className="color-darkSmoke margin-0 fontSize-lg">
                                    category: <strong className="fontFamily-sourceCodePro">Human silhouettes</strong>
                                </p>
                                <p className="color-darkSmoke marginBottom-4 fontSize-lg">
                                    type: <strong className="fontFamily-sourceCodePro">avatar rounded</strong>
                                </p>
                            </div>
                        </div>

                        {/* Default Component State */}
                        <div className="row">
                            <div className="col-xs-12">
                                <div style={componentContainer} className="component-container bg-white boxShadow-raised padding-10 borderRadius-sm">

                                    <div style={normalTitle} className="normal-title">
                                        <p className="fontSize-lg fontFamily-poppins color-silver">Normal State</p>
                                    </div>

                                    <div className="textAlign-center" style={componentStateStyle}>
                                        {/* Extra small */}
                                        <div className="me-avatar me-avatar--xs round" style={avatarStyle}>
                                            <img width="32" height="32" src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" alt="@rosa7082" />
                                        </div>

                                        {/* Small */}
                                        <div className="me-avatar me-avatar--sm round" style={avatarStyle}>
                                            <img width="40" height="40" src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" alt="@rosa7082" />
                                        </div>

                                        {/* Medium */}
                                        <div className="me-avatar me-avatar--md round" style={avatarStyle}>
                                            <img width="70" height="70" src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" alt="@rosa7082" />
                                        </div>

                                        {/* Large */}
                                        <div className="me-avatar me-avatar--lg round" style={avatarStyle}>
                                            <img width="100" height="100" src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" alt="@rosa7082" />
                                        </div>
                                    </div>

                                    {/* Design by */}
                                    <div style={designByContainer}>
                                        <a className="link-reset" style={designByLink} href="https://twitter.com/rosa7082" target="_blank">
                                            <span style={designByText} className="fontFamily-poppins fontSize-xs fontWeight-6 color-silver">Design by</span>
                                            <span className="marginLeft-1 fontFamily-poppins fontSize-xs fontWeight-6 color-silver">@rosa7082</span>
                                            <div className="marginLeft-1" style={designByText}>
                                                <img src="https://s3.amazonaws.com/waysily-img/stylepill/rouse-profile.png" alt="rosa7082" />
                                            </div>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-xs-12 col-sm-6">
                        <div style={componentRightContainer} className="component-container bg-white boxShadow-raised borderRadius-sm">

                            <div style={componentStateRightStyle} className="state-1 borderBottom-1 borderColor-darkSnow padding-5">
                                <div style={focusTitle} className="focus-title">
                                    <p className="fontSize-lg fontFamily-poppins color-silver">Type #1</p>
                                </div>
                                <div style={componentStateContainerStyle}>
                                    <div style={componentStateSection} className="flex-center">
                                        <div style={avatarStyle} className="me-avatar me-avatar--sm round flex-0">
                                            <img width="40" height="40" src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" alt="@rosa7082" />
                                        </div>
                                        <div className="flex-1 text-truncate textAlign-left marginLeft-2">
                                            <a style={userNameState} className="link-reset" href="#">Rosa & Sergio</a>
                                            <div>
                                                <a style={labelsState} className="link-reset" href="#">Jul 29</a>
                                                <span style={separatorPoint} className="paddingLeft-1 paddingRight-1">·</span>
                                                <span style={labelsState}>2 min read</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div style={componentStateRightStyle} className="state-2 borderBottom-1 borderColor-darkSnow padding-5">
                                <div style={focusTitle} className="focus-title">
                                    <p className="fontSize-lg fontFamily-poppins color-silver">Type #2</p>
                                </div>
                                <div style={componentStateContainerStyle} className="textAlign-center">
                                    <div style={componentStateSection} className="flex-center">
                                        <div className="me-avatar-container position-relative">
                                            <div style={avatarStyle} className="me-avatar me-avatar--sm round flex-0">
                                                <img width="40" height="40" src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" alt="@rosa7082" />
                                            </div>
                                            <div className="me-avatar-line me-avatar-line--sm">
                                                <svg viewBox="0 0 63 70" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <g id="line" fill-rule="nonzero" fill="#02b875">
                                                            <path d="M1.53538374,19.9430227 C7.180401,8.78497536 18.6271155,1.6 31.3571429,1.6 C44.0871702,1.6 55.5338847,8.78497536 61.178902,19.9430227 L62.2496695,19.401306 C56.4023065,7.84329843 44.5440457,0.4 31.3571429,0.4 C18.17024,0.4 6.3119792,7.84329843 0.46461626,19.401306 L1.53538374,19.9430227 Z" id="Shape"></path>
                                                            <path d="M61.178902,49.9077131 C55.5338847,61.0657604 44.0871702,68.2507358 31.3571429,68.2507358 C18.6271155,68.2507358 7.180401,61.0657604 1.53538374,49.9077131 L0.46461626,50.4494298 C6.3119792,62.0074373 18.17024,69.4507358 31.3571429,69.4507358 C44.5440457,69.4507358 56.4023065,62.0074373 62.2496695,50.4494298 L61.178902,49.9077131 Z" id="Shape"></path>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-1 text-truncate textAlign-left marginLeft-2">
                                            <a style={userNameState} className="link-reset" href="#">Rosa & Sergio</a>
                                            <div>
                                                <a style={labelsState} className="link-reset" href="#">Jul 29</a>
                                                <span style={separatorPoint} className="paddingLeft-1 paddingRight-1">·</span>
                                                <span style={labelsState}>2 min read</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="state-3 padding-5" style={componentStateRightStyle}>
                                <div style={focusTitle} className="focus-title">
                                    <p className="fontSize-lg fontFamily-poppins color-silver">Type #3</p>
                                </div>
                                <div style={componentStateContainerStyle} className="textAlign-center">
                                    <div style={componentStateSection} className="flex-center">
                                        <div style={avatarStyle} className="me-avatar me-avatar--sm round flex-0">
                                            <img width="40" height="40" src="" alt="@rosa7082" />
                                        </div>
                                        <div className="flex-1 text-truncate textAlign-left marginLeft-2">
                                            <a style={userNameState} className="link-reset" href="">Rosa & Sergio</a>
                                            <div>
                                                <a style={labelsState} className="link-reset" href="">Jul 29</a>
                                                <span style={separatorPoint}>·</span>
                                                <span style={labelsState}>2 min read</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
};

/* Export */
export default ComponentDetailSection;