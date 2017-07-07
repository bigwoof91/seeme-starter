const React = require('react');
import { Link } from 'react-router';
import FaBicycle from 'react-icons/lib/fa/bicycle';
import FaBed from 'react-icons/lib/fa/bed';
import FaNewspaperO from 'react-icons/lib/fa/newspaper-o';
import FaMotorcycle from 'react-icons/lib/fa/motorcycle';
import FaBank from 'react-icons/lib/fa/bank';
import FaAutomobile from 'react-icons/lib/fa/automobile';
import FaBriefcase from 'react-icons/lib/fa/briefcase';
import FaPlane from 'react-icons/lib/fa/plane';
import FaLightbulbO from 'react-icons/lib/fa/lightbulb-o';
import FaGavel from 'react-icons/lib/fa/Gavel';
import FaPaintBrush from 'react-icons/lib/fa/paint-brush';
import FaCalculator from 'react-icons/lib/fa/calculator';
import FaGraduationCap from 'react-icons/lib/fa/graduation-cap';
import FaCamera from 'react-icons/lib/fa/camera';
import FaMusic from 'react-icons/lib/fa/music';
import FaSpoon from 'react-icons/lib/fa/spoon';
import FaTree from 'react-icons/lib/fa/tree';

const YourInfo = React.createClass({
  renderForGender() {
    if (this.props.is_male === "guy") {
      console.log("iswhat", this.props.is_male);
      return (
        <div className="user-info-text">
          <h2>Hi, my name is {this.props.firstName}! I am one handsome {this.props.age} year old {this.props.is_male}.</h2>
        </div>
      )
    } else if (this.props.is_male === "girl") {
      console.log("iswhat", this.props.is_male);
      return (
        <div className="user-info-text">
          <h2>Hi, my name is {this.props.firstName}! I am a simply beautiful {this.props.age} year old {this.props.is_male}.</h2>
        </div>
      )
    }
  },
  render() {
    return (
      <div className="user-info">
        <div>
          {this.renderForGender()}
        </div>
        <div className="user-interests">
          <div className="flex-row">
            {this.props.cycling ? <span className="int-text"><i><FaBicycle /></i><p>Cycling</p></span> : null}
            {this.props.sleeping ? <span className="int-text"><i><FaBed /></i><p>Sleeping</p></span> : null}
            {this.props.motorcycles ? <span className="int-text"><i><FaMotorcycle /></i><p>Motorcycles</p></span> : null}
            {this.props.learning ? <span className="int-text"><i><FaGraduationCap /></i><p>Learning</p></span> : null}

            {this.props.traveling ? <span className="int-text"><i><FaPlane /></i><p>Traveling</p></span> : null}
            {this.props.innovating ? <span className="int-text"><i><FaLightbulbO /></i><p>Innovating</p></span> : null}
            {this.props.photography ? <span className="int-text"><i><FaCamera /></i><p>Photography</p></span> : null}
            {this.props.cars ? <span className="int-text"><i><FaAutomobile /></i><p>Cars</p></span> : null}

            {this.props.news ? <span className="int-text"><i><FaNewspaperO /></i><p>News</p></span> : null}
            {this.props.art ? <span className="int-text"><i><FaPaintBrush /></i><p>Art</p></span> : null}
            {this.props.music ? <span className="int-text"><i><FaMusic /></i><p>Music</p></span> : null}
            {this.props.cooking ? <span className="int-text"><i><FaSpoon /></i><p>Cooking</p></span> : null}
            {this.props.outdoors ? <span className="int-text"><i><FaTree /></i><p>Outdoors</p></span> : null}
          </div>
        </div>
      </div>
    );
  }
})

module.exports = YourInfo;