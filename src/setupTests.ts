import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "@testing-library/jest-dom";

enzyme.configure({ adapter: new Adapter() });
