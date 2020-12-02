import React from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { CroptomizeIdealFarmProps } from './CroptomizeIdealFarmProps'
import { AppFonts, AppColors } from '../styles/AppStyles'
import { DropDownButton } from '../components/DropDownButton'
import { SwipeableModal } from '../components/SwipeableModal'
import { RoundedTopView } from '../components/RoundedTopView'
import { CropType, getIdealFarmDisplayNameForCropType } from '../../model/Symbols'

interface CroptomizeIdealFarmComponentState {
  selectCropVisible: boolean
}

export class CroptomizeIdealFarmScreen extends React.Component<
  CroptomizeIdealFarmProps,
  CroptomizeIdealFarmComponentState
> {
  constructor(props: CroptomizeIdealFarmProps) {
    super(props)
    this.state = {
      selectCropVisible: false,
    }
  }
  selectCropType(cropType: string) {
    this.setState({ selectCropVisible: false })
    this.props.uiStore.selectIdealFarmCrop(cropType)
  }
  renderCropButton(cropType: string) {
    return (
      <TouchableOpacity
        onPress={() => this.selectCropType(cropType)}
        style={[
          styles.dateButton,
          { backgroundColor: this.props.uiStore.idealFarmCropType === cropType ? AppColors.yellow : 'white' },
        ]}
      >
        <View>
          <View>
            <Text style={[styles.buttonTitle, styles.navyText]}>{getIdealFarmDisplayNameForCropType(cropType)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const dropDownText = getIdealFarmDisplayNameForCropType(this.props.uiStore.idealFarmCropType)
    return (
      <SafeAreaView style={styles.container}>
        <SwipeableModal
          onDismiss={() => this.setState({ selectCropVisible: false })}
          visible={this.state.selectCropVisible}
        >
          <RoundedTopView title="Select Crop">
            <FlatList
              data={Object.keys(CropType)}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({ item }) => this.renderCropButton(item)}
            />
          </RoundedTopView>
        </SwipeableModal>
        <ScrollView>
          <DropDownButton
            action={() => this.setState({ selectCropVisible: true })}
            text={dropDownText}
            style={styles.monthPicker}
          />
          <Text style={styles.title}>50% of Crop Sold</Text>
          <Text style={styles.subtitle}>150,000/300,000 Bushels | 15,000 Acres</Text>

          <View style={styles.listView}>
            <View style={styles.bgItem}>
              <View style={styles.bgContentsItem}>
                <View style={styles.cropMainView}>
                  <View style={styles.cropIconContainer}>
                    <Image style={styles.cropIcon} source={require('../../../assets/corn-large.png')} />
                  </View>
                  <Text style={styles.cropTitle}>CORN</Text>
                  <Text style={styles.cropSubTitle}>ZCN19</Text>
                </View>
                <View style={styles.lineVerticalView}></View>
                <View style={styles.detailsView}>
                  <View style={styles.revenueView}>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>REVENUE ($0 Bais)</Text>
                      <Text style={styles.detailValue}>$90,000</Text>
                    </View>
                    <View style={styles.viewDetailView}>
                      <Text style={styles.viewDetailtext}>View Details</Text>
                      <Image source={require('../../../assets/chevron-right.png')} style={styles.viewDetailIcon} />
                    </View>
                  </View>
                  <View style={styles.lineHorizontalView}></View>
                  <View style={styles.detailSubView}>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>QUANTITY</Text>
                      <Text style={styles.detailValue}>20,000 bu</Text>
                    </View>
                    <View style={styles.lineVerticalView}></View>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>BOARD PRICE</Text>
                      <Text style={styles.detailValue}>$4.50</Text>
                    </View>
                  </View>
                  <View style={styles.lineHorizontalView}></View>
                  <View style={styles.detailSubView}>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>TRADE DATE</Text>
                      <Text style={styles.detailValue}>2019-06-15</Text>
                    </View>
                    <View style={styles.lineVerticalView}></View>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>ACTIVE MONTH</Text>
                      <Text style={styles.detailValue}>July 2019</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.bgItem}>
              <View style={styles.bgContentsItem}>
                <View style={styles.cropMainView}>
                  <View style={styles.cropIconContainer}>
                    <Image style={styles.cropIcon} source={require('../../../assets/corn-large.png')} />
                  </View>
                  <Text style={styles.cropTitle}>CORN</Text>
                  <Text style={styles.cropSubTitle}>ZCN19</Text>
                </View>
                <View style={styles.lineVerticalView}></View>
                <View style={styles.detailsView}>
                  <View style={styles.revenueView}>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>REVENUE ($0 Bais)</Text>
                      <Text style={styles.detailValue}>$90,000</Text>
                    </View>
                    <View style={styles.viewDetailView}>
                      <Text style={styles.viewDetailtext}>View Details</Text>
                      <Image source={require('../../../assets/chevron-right.png')} style={styles.viewDetailIcon} />
                    </View>
                  </View>
                  <View style={styles.lineHorizontalView}></View>
                  <View style={styles.detailSubView}>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>QUANTITY</Text>
                      <Text style={styles.detailValue}>20,000 bu</Text>
                    </View>
                    <View style={styles.lineVerticalView}></View>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>BOARD PRICE</Text>
                      <Text style={styles.detailValue}>$4.50</Text>
                    </View>
                  </View>
                  <View style={styles.lineHorizontalView}></View>
                  <View style={styles.detailSubView}>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>TRADE DATE</Text>
                      <Text style={styles.detailValue}>2019-06-15</Text>
                    </View>
                    <View style={styles.lineVerticalView}></View>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>ACTIVE MONTH</Text>
                      <Text style={styles.detailValue}>July 2019</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.bgItem}>
              <View style={styles.bgContentsItem}>
                <View style={styles.cropMainView}>
                  <View style={styles.cropIconContainer}>
                    <Image style={styles.cropIcon} source={require('../../../assets/corn-large.png')} />
                  </View>
                  <Text style={styles.cropTitle}>CORN</Text>
                  <Text style={styles.cropSubTitle}>ZCN19</Text>
                </View>
                <View style={styles.lineVerticalView}></View>
                <View style={styles.detailsView}>
                  <View style={styles.revenueView}>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>REVENUE ($0 Bais)</Text>
                      <Text style={styles.detailValue}>$90,000</Text>
                    </View>
                    <View style={styles.viewDetailView}>
                      <Text style={styles.viewDetailtext}>View Details</Text>
                      <Image source={require('../../../assets/chevron-right.png')} style={styles.viewDetailIcon} />
                    </View>
                  </View>
                  <View style={styles.lineHorizontalView}></View>
                  <View style={styles.detailSubView}>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>QUANTITY</Text>
                      <Text style={styles.detailValue}>20,000 bu</Text>
                    </View>
                    <View style={styles.lineVerticalView}></View>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>BOARD PRICE</Text>
                      <Text style={styles.detailValue}>$4.50</Text>
                    </View>
                  </View>
                  <View style={styles.lineHorizontalView}></View>
                  <View style={styles.detailSubView}>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>TRADE DATE</Text>
                      <Text style={styles.detailValue}>2019-06-15</Text>
                    </View>
                    <View style={styles.lineVerticalView}></View>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>ACTIVE MONTH</Text>
                      <Text style={styles.detailValue}>July 2019</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.bgItem}>
              <View style={styles.bgContentsItem}>
                <View style={styles.cropMainView}>
                  <View style={styles.cropIconContainer}>
                    <Image style={styles.cropIcon} source={require('../../../assets/corn-large.png')} />
                  </View>
                  <Text style={styles.cropTitle}>CORN</Text>
                  <Text style={styles.cropSubTitle}>ZCN19</Text>
                </View>
                <View style={styles.lineVerticalView}></View>
                <View style={styles.detailsView}>
                  <View style={styles.revenueView}>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>REVENUE ($0 Bais)</Text>
                      <Text style={styles.detailValue}>$90,000</Text>
                    </View>
                    <View style={styles.viewDetailView}>
                      <Text style={styles.viewDetailtext}>View Details</Text>
                      <Image source={require('../../../assets/chevron-right.png')} style={styles.viewDetailIcon} />
                    </View>
                  </View>
                  <View style={styles.lineHorizontalView}></View>
                  <View style={styles.detailSubView}>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>QUANTITY</Text>
                      <Text style={styles.detailValue}>20,000 bu</Text>
                    </View>
                    <View style={styles.lineVerticalView}></View>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>BOARD PRICE</Text>
                      <Text style={styles.detailValue}>$4.50</Text>
                    </View>
                  </View>
                  <View style={styles.lineHorizontalView}></View>
                  <View style={styles.detailSubView}>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>TRADE DATE</Text>
                      <Text style={styles.detailValue}>2019-06-15</Text>
                    </View>
                    <View style={styles.lineVerticalView}></View>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>ACTIVE MONTH</Text>
                      <Text style={styles.detailValue}>July 2019</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.bgItem}>
              <View style={styles.bgContentsItem}>
                <View style={styles.cropMainView}>
                  <View style={styles.cropIconContainer}>
                    <Image style={styles.cropIcon} source={require('../../../assets/corn-large.png')} />
                  </View>
                  <Text style={styles.cropTitle}>CORN</Text>
                  <Text style={styles.cropSubTitle}>ZCN19</Text>
                </View>
                <View style={styles.lineVerticalView}></View>
                <View style={styles.detailsView}>
                  <View style={styles.revenueView}>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>REVENUE ($0 Bais)</Text>
                      <Text style={styles.detailValue}>$90,000</Text>
                    </View>
                    <View style={styles.viewDetailView}>
                      <Text style={styles.viewDetailtext}>View Details</Text>
                      <Image source={require('../../../assets/chevron-right.png')} style={styles.viewDetailIcon} />
                    </View>
                  </View>
                  <View style={styles.lineHorizontalView}></View>
                  <View style={styles.detailSubView}>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>QUANTITY</Text>
                      <Text style={styles.detailValue}>20,000 bu</Text>
                    </View>
                    <View style={styles.lineVerticalView}></View>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>BOARD PRICE</Text>
                      <Text style={styles.detailValue}>$4.50</Text>
                    </View>
                  </View>
                  <View style={styles.lineHorizontalView}></View>
                  <View style={styles.detailSubView}>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>TRADE DATE</Text>
                      <Text style={styles.detailValue}>2019-06-15</Text>
                    </View>
                    <View style={styles.lineVerticalView}></View>
                    <View style={styles.detailItemView}>
                      <Text style={styles.detailTitle}>ACTIVE MONTH</Text>
                      <Text style={styles.detailValue}>July 2019</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: AppColors.backgroundCream,
  },
  monthPicker: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginTop: 13,
  },
  dateButton: {
    borderRadius: 5,
    padding: 16,
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  navyText: {
    fontSize: 15,
    color: AppColors.navy,
    fontFamily: AppFonts.semiBold,
  },
  buttonTitle: {
    paddingTop: 0,
  },
  title: {
    fontSize: 18,
    fontFamily: AppFonts.button,
    textAlign: 'center',
    color: AppColors.navy,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: AppFonts.body,
    textAlign: 'center',
    color: AppColors.navy,
    marginTop: 5,
  },
  listView: {
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  bgItem: {
    marginTop: 10,
    backgroundColor: AppColors.white,
    borderRadius: 10,
    padding: 8,
  },
  bgContentsItem: {
    borderRadius: 7,
    borderColor: AppColors.lightGreyText,
    borderWidth: 0.5,
    flexDirection: 'row',
  },
  cropMainView: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  cropIcon: {
    alignSelf: 'center',
    tintColor: AppColors.white,
  },
  cropIconContainer: {
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    backgroundColor: AppColors.yellow,
  },
  cropTitle: {
    fontSize: 15,
    fontFamily: AppFonts.button,
    textAlign: 'center',
    color: AppColors.navy,
    marginTop: 15,
  },
  cropSubTitle: {
    fontSize: 11,
    fontFamily: AppFonts.regular,
    textAlign: 'center',
    color: AppColors.navy,
  },
  lineVerticalView: {
    width: 0.5,
    backgroundColor: AppColors.lightGreyText,
  },
  lineHorizontalView: {
    height: 0.5,
    backgroundColor: AppColors.lightGreyText,
  },
  detailsView: {
    flex: 3,
  },
  revenueView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailSubView: {
    flex: 1,
    flexDirection: 'row',
  },
  detailItemView: {
    flex: 1,
    padding: 10,
  },
  detailTitle: {
    fontSize: 11,
    fontFamily: AppFonts.regular,
    color: AppColors.lightGreyText,
  },
  detailValue: {
    fontSize: 12,
    fontFamily: AppFonts.button,
    color: AppColors.navy,
  },
  viewDetailView: {
    padding: 10,
    flexDirection: 'row',
  },
  viewDetailtext: {
    fontSize: 11,
    fontFamily: AppFonts.button,
    color: AppColors.info,
  },
  viewDetailIcon: {
    height: 12,
    width: 8,
    tintColor: AppColors.info,
    marginLeft: 5,
  },
})
