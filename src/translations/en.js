export default {
  aor: {
    action: {
      delete: 'Delete',
      show: 'Show',
      list: 'List',
      save: 'Save',
      create: 'Create',
      edit: 'Edit',
      cancel: 'Cancel',
      refresh: 'Refresh',
      add_filter: 'Add filter',
      remove_filter: 'Remove this filter',
      back: 'Go Back',
    },
    boolean: {
      true: 'Yes',
      false: 'No',
    },
    page: {
      list: '%{name} List',
      edit: '%{name} #%{id}',
      show: '%{name} #%{id}',
      create: 'Create %{name}',
      delete: 'Delete %{name} #%{id}',
      dashboard: 'Dashboard',
      not_found: 'Not Found',
    },
    input: {
      autocomplete: {
        none: '',
      },
      file: {
        upload_several:
          'Drop some files to upload, or click to select one.',
        upload_single: 'Drop a file to upload, or click to select it.',
      },
      image: {
        upload_several:
          'Drop some pictures to upload, or click to select one.',
        upload_single:
          'Drop a picture to upload, or click to select it.',
      },
    },
    message: {
      yes: 'Yes',
      no: 'No',
      are_you_sure: 'Are you sure?',
      about: 'About',
      not_found:
        'Either you typed a wrong URL, or you followed a bad link.',
    },
    navigation: {
      no_more_results: 'No more results found',
      no_results: 'This entity hasn\'t been modified: no history to show',
      page_out_of_boundaries: 'Page number %{page} out of boundaries',
      page_out_from_end: 'Cannot go after last page',
      page_out_from_begin: 'Cannot go before page 1',
      page_range_info: '%{offsetBegin}-%{offsetEnd} of %{total}',
      next: 'Next',
      prev: 'Prev',
    },
    auth: {
      logged_in: 'Logged in',
      logged_out: 'Logged out',
      login: 'Login',
      logout: 'Logout',
      name: 'Name',
      last_name: 'Last Name (optional)',
      first_name: 'First Name (optional)',
      avatar: 'Your Photo URL (optional)',
      bio: 'Short Bio (optional)',
      education: 'Your Education (optional)',
      website: 'Your Website (optional)',
      username: 'Username',
      password: 'Password',
      email: 'Email',
      sign_in: 'Sign in',
      sign_up: 'Sign up',
      sign_up_error: 'Sign up failed, please retry',
      sign_in_error: 'Authentication failed, please retry',
      logging_in: 'Logged in',
      signing_up: 'Signed up',
    },
    notification: {
      updated: 'Successfully updated',
      created: 'Successfully created',
      deleted: 'Successfully deleted',
      item_doesnt_exist: 'Element does not exist',
      http_error: 'Server communication error',
    },
    validation: {
      required: 'Required',
      minLength: 'Must be %{min} characters at least',
      maxLength: 'Must be %{max} characters or less',
      minValue: 'Must be at least %{min}',
      maxValue: 'Must be %{max} or less',
      number: 'Must be a number',
      email: 'Must be a valid email',
    },
    profile_image: 'Avatar',
    edit_profile: 'Edit Profile',
  },
  auth: {
    logged_in: 'Logged in',
    logged_out: 'Logged out',
    login: 'Login',
    logout: 'Logout',
    sign_in: 'Sign In',
    sign_up: 'Join'
  },
  pos: {
    timeline: { expand: 'Expand Timeline', reset: 'Reset Timeline View' },
    about: 'About Chronas',
    account: 'Manage Account',
    back: 'Back',
    community: 'Community Board',
    information: 'Information',
    areas: 'Areas',
    edit: 'Edit',
    fontType: 'Font Type',
    markerType: 'Marker Type',
    goFullScreen: 'Toggle Fullscreen Mode',
    noLinkedContents: 'There are no linked media items yet, consider adding and linking one.',
    downvote: 'Inappropriate, broken or inaccurate',
    feedbackSuccess: 'Thanks for curating the data!',
    signupToGatherPoints: 'Sign up to get points for your curations',
    pointsAdded: 'Points added to your account',
    mod: 'Modification',
    markers: 'Markers',
    metadata: 'Metadata',
    revisions: 'Revisions',
    images: 'Images',
    search: 'Search',
    map: '',
    layers: 'Layers',
    loading: 'loading...',
    configuration: 'Configuration',
    discover: 'Discover',
    discover_label: 'Discover the year ',
    language: 'Language',
    random: 'Random Article',
    help: 'Intro and Information',
    share: 'Share as link or export image',
    resources: 'Resources',
    related_item: 'RELATED ITEMS...',
    users: 'Manage Users',
    upvote: 'Interesting and accurate',
    openEpic: 'Open Own Epic',
    theme: {
      name: 'Theme',
      dark: 'Dark',
      marker: 'Marker',
      light: 'Light',
      font: 'Font'
    },
    discover_component: {
      openArticle: 'Open related Wikipedia article',
      hasNoArticle: 'No Wiki article linked yet, please consider editing this item',
      openSource: 'Open source in new tab',
      hasNoSource: 'No source linked yet, please consider editing this item',
      edit: 'Edit this item',
    },
    welcome: 'Welcome',
  },
  resources: {
    links: {
      fields : {
        source: 'Source article receiving links',
        media_list: 'Items to appear in the media section',
        content_list: 'Items to appear in the left content list section',
      }
    },
    areas: {
      fields: {
        province_list: 'Click on provinces to selecect/ deselect',
        display_name: 'Display Name',
        search_name: 'Select By Name',
        main_ruler_name: 'Main Ruler Name',
        color: 'Area Color',
        main_religion_name: 'Main Religion Name',
        wiki_url: 'Full Wikipedia URL',
        ruler: 'Ruler',
        culture: 'Culture',
        religion: 'Religion',
        capital: 'Capital',
        population: 'Population',
        startYear: 'From Year',
        endYear: 'Until Year'
      }
    },
    linked: {
      fields: {
        description: 'Description or content (if HTML type selected)',
        poster: 'Link to poster image',
        onlyEpicContent: 'Only used as linked part of another article (you will be forwarded to the link form upon saving)',
        src: 'Link to source/ ID'
      }
    },
    users: {
      name: 'User |||| Users',
      fields: {
        username: 'Username',
        name: 'Name',
        createdAt: 'Created at',
        education: 'Education',
        email: 'Email',
        privilege: 'Privilege',
        karma: 'Karma',
      },
      tabs: {
        identity: 'Identity',
        address: 'Address',
        orders: 'Orders',
        reviews: 'Reviews',
        stats: 'Stats',
      },
      page: {
        delete: 'Delete Account',
      },

    },
    page: {
      delete: 'Delete',
    },
    markers: {
      name: 'Marker |||| Markers',
      place_marker: 'Place Marker',
      deleted: 'Marker Deleted',
      fields: {
        name: 'Name',
        url: 'URL',
        coo: 'Coordinates',
        type: 'Type',
        lat: 'Latitude',
        lng: 'Longitude',
        subtype: 'Subtype',
        lastUpdated: 'Last Updated',
        startYear: 'Year Start',
        endYear: 'Year End',
        year: 'Year',
        date: 'Date',
        rating: 'Rating',
      },
      tabs: {
        identity: 'Identity',
        address: 'Address',
        orders: 'Orders',
        reviews: 'Reviews',
        stats: 'Stats',
      },

    },
    revisions: {
      name: 'Revision |||| Revisions',
      fields: {
        name: 'Name',
        type: 'Type',
        resource: 'Resource',
        user: 'User',
        subtype: 'Subtype',
        nextBody: 'Next Body',
        prevBody: 'Prev Body',
        reverted: 'Reverted',
        timestamp: 'Timestamp',
        id: 'Id',
        entityId: 'Entity Id',
      },
    },
    commands: {
      name: 'Order |||| Orders',
      fields: {
        basket: {
          delivery: 'Delivery',
          reference: 'Reference',
          quantity: 'Quantity',
          sum: 'Sum',
          tax_rate: 'Tax Rate',
          total: 'Total',
          unit_price: 'Unit Price',
        },
        customer_id: 'Customer',
        date_gte: 'Passed Since',
        date_lte: 'Passed Before',
        total_gte: 'Min amount',
      },
    },
    products: {
      name: 'Poster |||| Posters',
      fields: {
        category_id: 'Category',
        height_gte: 'Min height',
        height_lte: 'Max height',
        height: 'Height',
        image: 'Image',
        price: 'Price',
        reference: 'Reference',
        stock_lte: 'Low Stock',
        stock: 'Stock',
        thumbnail: 'Thumbnail',
        width_gte: 'Min width',
        width_lte: 'mx_width',
        width: 'Width',
      },
      tabs: {
        image: 'Image',
        details: 'Details',
        description: 'Description',
        reviews: 'Reviews',
      },
    },
    categories: {
      name: 'Category |||| Categories',
      fields: {
        products: 'Products',
      },

    },
    reviews: {
      name: 'Review |||| Reviews',
      fields: {
        customer_id: 'Customer',
        command_id: 'Order',
        product_id: 'Product',
        date_gte: 'Posted since',
        date_lte: 'Posted before',
        date: 'Date',
        comment: 'Comment',
        rating: 'Rating',
      },
      action: {
        accept: 'Accept',
        reject: 'Reject',
      },
      notification: {
        approved_success: 'Review approved',
        approved_error: 'Error: Review not approved',
        rejected_success: 'Review rejected',
        rejected_error: 'Error: Review not rejected',
      },
    },
    segments: {
      name: 'Segments',
      fields: {
        customers: 'Customers',
        name: 'Name',
      },
      data: {
        compulsive: 'Compulsive',
        collector: 'Collector',
        ordered_once: 'Ordered once',
        regular: 'Regular',
        returns: 'Returns',
        reviewer: 'Reviewer',
      },
    },
  },
};
