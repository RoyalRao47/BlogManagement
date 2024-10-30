// ApiBlog myDeserializedClass = JsonConvert.DeserializeObject<ApiBlog>(myJsonResponse);
using System.Text.Json.Serialization;
using Newtonsoft.Json;

public class ApiBlogModel
{
    public string type_of { get; set; }
    public int id { get; set; }
    public string title { get; set; }
    public string description { get; set; }
    public string readable_publish_date { get; set; }
    public string slug { get; set; }
    public string path { get; set; }
    public string url { get; set; }
    public int comments_count { get; set; }
    public int public_reactions_count { get; set; }
    public object collection_id { get; set; }
    public DateTime published_timestamp { get; set; }
    public int positive_reactions_count { get; set; }
    public string cover_image { get; set; }
    public string social_image { get; set; }
    public string canonical_url { get; set; }
    public DateTime created_at { get; set; }
    public object edited_at { get; set; }
    public object crossposted_at { get; set; }
    public DateTime published_at { get; set; }
    public DateTime last_comment_at { get; set; }
    public int reading_time_minutes { get; set; }

    public string body_markdown { get; set; }
    public string body_html { get; set; }
    
    [JsonProperty("tag_list")]
    [Newtonsoft.Json.JsonConverter(typeof(SingleOrArrayJsonConverter<string>))]
    public List<string> tag_list { get; set; }
    
    // [Newtonsoft.Json.JsonConverter(typeof(SingleOrArrayJsonConverter<List<string>>))]
    // public string tags { get; set; }
    
    public User user { get; set; }
}

public class User
{
    public string name { get; set; }
    public string username { get; set; }
    public object twitter_username { get; set; }
    public object github_username { get; set; }
    public int user_id { get; set; }
    public object website_url { get; set; }
    public string profile_image { get; set; }
    public string profile_image_90 { get; set; }
}

public class SingleOrArrayJsonConverter<T> : Newtonsoft.Json.JsonConverter
{
    public override bool CanConvert(Type objectType)
    {
        return (objectType == typeof(List<T>));
    }

    public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
    {
        Newtonsoft.Json.Linq.JToken token = Newtonsoft.Json.Linq.JToken.Load(reader);
        if (token.Type == Newtonsoft.Json.Linq.JTokenType.Array)
        {
            return token.ToObject<List<T>>();
        }
        return new List<T> { token.ToObject<T>() };
    }

    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
    {
        throw new NotImplementedException();
    }
}