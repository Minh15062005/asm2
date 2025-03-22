import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import '../css/sb-admin-2.css';  // Đảm bảo đường dẫn đúng
import '../css/sb-admin-2.min.css';  // Đảm bảo đường dẫn đúng

const HomeAdmin = () => {
  const { logout } = useAuth();

  return (
    <div id="wrapper">


      {/* End of Sidebar */}

      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">

        {/* Main Content */}
        <div id="content">

          {/* Topbar */}


          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown no-arrow">

              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a className="dropdown-item" href="#" onClick={logout}>
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Đăng xuất
                </a>
              </div>
            </li>
          </ul>



          {/* Page Content */}
          <div className="container-fluid">
            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                <i className="fas fa-download fa-sm text-white-50"></i> Generate Report
              </a>
            </div>

            {/* Content Row */}
            <div className="row">
              {/* Earnings (Monthly) Card Example */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Earnings (Monthly)</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Earnings (Annual) Card Example */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Earnings (Annual)</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasks Progress Card Example */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-info shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks</div>
                        <div className="row no-gutters align-items-center">
                          <div className="col-auto">
                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                          </div>
                          <div className="col">
                            <div className="progress progress-sm mr-2">
                              <div className="progress-bar bg-info" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Requests Card Example */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Pending Requests</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-comments fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Row for Charts */}
            <div className="row">

              {/* Area Chart */}
              <div className="col-xl-8 col-lg-7">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                  </div>
                  <div className="card-body">
                    <div className="chart-area">
                      <canvas id="myAreaChart"></canvas>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="col-xl-4 col-lg-5">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                  </div>
                  <div className="card-body">
                    <div className="chart-pie pt-4 pb-2">
                      <canvas id="myPieChart"></canvas>
                    </div>
                    <div className="mt-4 text-center small">
                      <span className="mr-2">
                        <i className="fas fa-circle text-primary"></i> Direct
                      </span>
                      <span className="mr-2">
                        <i className="fas fa-circle text-success"></i> Social
                      </span>
                      <span className="mr-2">
                        <i className="fas fa-circle text-info"></i> Referral
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Row for Additional Information */}
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Projects</h6>
                  </div>
                  <div className="card-body">
                    <h4 className="small font-weight-bold">Server Migration <span className="float-right">20%</span></h4>
                    <div className="progress mb-4">
                      <div className="progress-bar bg-danger" role="progressbar" style={{ width: '20%' }} aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}></div>
                    </div>
                    <h4 className="small font-weight-bold">Sales Tracking <span className="float-right">40%</span></h4>
                    <div className="progress mb-4">
                      <div className="progress-bar bg-warning" role="progressbar" style={{ width: '40%' }} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}></div>
                    </div>
                    <h4 className="small font-weight-bold">Customer Database <span className="float-right">60%</span></h4>
                    <div className="progress mb-4">
                      <div className="progress-bar" role="progressbar" style={{ width: '60%' }} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}></div>
                    </div>
                    <h4 className="small font-weight-bold">Payout Details <span className="float-right">80%</span></h4>
                    <div className="progress mb-4">
                      <div className="progress-bar bg-info" role="progressbar" style={{ width: '80%' }} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
                    </div>
                    <h4 className="small font-weight-bold">Account Setup <span className="float-right">Complete!</span></h4>
                    <div className="progress">
                      <div className="progress-bar bg-success" role="progressbar" style={{ width: '100%' }} aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Illustrations</h6>
                  </div>
                  <div className="card-body">
                    <div className="text-center">
                      <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: '25rem' }} src="../img/undraw_posting_photo.svg" alt="..." />
                    </div>
                    <p>Add some quality, svg illustrations to your project courtesy of <a target="_blank" rel="nofollow" href="https://undraw.co/">unDraw</a>.</p>
                    <a target="_blank" rel="nofollow" href="https:/undraw.co/">Browse Illustrations on unDraw &rarr;</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>




      </div>
      {/* End of Content Wrapper */}

    </div>
  );
};

export default HomeAdmin;