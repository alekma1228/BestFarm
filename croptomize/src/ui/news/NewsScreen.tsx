import React, { useEffect } from 'react'
import { AnalyticsType } from '../../analytics/MoLoAnalytics'
import { BasisStore } from '../../stores/BasisStore'
import { UIStore } from '../../stores/UIStore'
import { NavigationInjectedProps } from 'react-navigation'
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { BlogPost } from '../../services/CroptomizeService'
import { AppColors } from '../styles/AppStyles'
import moment from 'moment'
import { LoadingView } from '../components/LoadingView'
import { FarmScreenNames, PostTitleKey } from '../navigation/FarmScreenNames'

export interface NewsComponentProps {
  analyticsService: AnalyticsType
  basisStore: BasisStore
  uiStore: UIStore
}

export interface NewsComponentActions {}

export type NewsProps = NavigationInjectedProps & NewsComponentProps

interface PostProps {
  post: BlogPost
  postSelected: (post: BlogPost) => void
}

const removeTagsRegex = /(<([^>]+)>|[\n\t])/gi
const removeUnicodeRegex = /&#\d{4};/gi

const formatDate = (dateString: string) => moment(dateString).format('MMMM DD, YYYY h:mm A')

const getImageUrl = (post: BlogPost) => {
  if (post._embedded && post._embedded['wp:featuredmedia']) {
    for (const media of post._embedded['wp:featuredmedia']) {
      const sizeForDisplay = media.media_details.sizes['medium'] || media.media_details.sizes['large']
      if (sizeForDisplay) {
        return {
          uri: sizeForDisplay.source_url,
        }
      }
    }
  }

  return require('../../../assets/croptomize-full-logo.png')
}

const formatContent = (contentString: string) => {
  return contentString.replace(removeTagsRegex, '').replace(removeUnicodeRegex, ' ')
  // .replace('&#8212;', ' ')
  // .replace('&#8217;', ' ')
}

const Post = (props: PostProps) => {
  // Replace html tags and magic quotes
  const content = formatContent(props.post.content.rendered)
  const image = getImageUrl(props.post)
  const hasUniqueImage = image.uri ? true : false

  return (
    <TouchableOpacity onPress={() => props.postSelected(props.post)}>
      <View style={styles.postContainer}>
        <Image source={image} style={[styles.postImage, hasUniqueImage ? {} : { resizeMode: 'contain' }]} />
        <View style={styles.postDetailsContainer}>
          <Text style={styles.postDate}>{formatDate(props.post.date)}</Text>
          <Text style={styles.postTitle}>{formatContent(props.post.title.rendered)}</Text>
          <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.postSnippet}>
            {content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const showPost = (props: NewsProps, post: BlogPost) => {
  props.uiStore.selectBlogPost(post)
  props.navigation.navigate(FarmScreenNames.Web, { [PostTitleKey]: post.title.rendered.replace(removeTagsRegex, '') })
}

export const NewsScreen = (props: NewsProps) => {
  useEffect(() => {
    props.uiStore.fetchBlogPosts()
  }, [])

  if (props.uiStore.loadingBlogPosts) {
    return <LoadingView />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Latest News</Text>
      <FlatList
        style={{ flexGrow: 0 }}
        data={props.uiStore.blogPosts}
        keyExtractor={post => post.id.toString()}
        renderItem={({ item }) => <Post post={item} postSelected={post => showPost(props, post)} />}
        ItemSeparatorComponent={() => (
          <View style={{ flexDirection: 'row' }}>
            <View style={{ height: 1, width: 20, backgroundColor: '#FCFAF3' }} />
            <View style={styles.seperator} />
          </View>
        )}
        ListHeaderComponent={() => <View style={styles.listBorder} />}
        ListFooterComponent={() => <View style={styles.listBorder} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppColors.backgroundCream },
  headerText: {
    color: AppColors.navy,
    fontFamily: 'Montserrat-Medium',
    fontSize: 24,
    marginLeft: 17,
    marginBottom: 7,
    marginTop: 17,
  },
  seperator: {
    height: 1,
    backgroundColor: '#E8E5DC',
    alignSelf: 'flex-end',
    width: 355,
  },
  postContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 23,
    marginTop: 9,
    marginBottom: 9,
    alignItems: 'center',
  },
  postImage: {
    borderRadius: 5,
    height: 84,
    width: 84,
    resizeMode: 'cover',
    flexGrow: 0,
  },
  postDetailsContainer: {
    flex: 1,
    marginLeft: 18,
  },
  postDate: {
    color: '#8C9EAF',
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    marginBottom: 2,
  },
  postTitle: {
    color: AppColors.navy,
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
  listBorder: {
    height: 1,
    backgroundColor: '#E8E5DC',
    width: 355,
    alignSelf: 'center',
  },
  postSnippet: { marginTop: 8 },
})
